import {Command, Option} from 'clipanion'
import canvas from 'canvas'
import sharp from 'sharp'
import exifr from 'exifr'
import moment from 'moment'
import fs from 'fs-extra'
import mozjpeg from 'node-mozjpeg'
import MeasureTimer from '../Timer.js'
import {globby} from 'globby'
import pmap from 'promise.map'
import path from 'path'
import {cpus} from 'os'

export class DateCommand extends Command {
  static paths = [
    //
    ['date'],
    ['with-date'],
  ]

  files = Option.String({required: true})

  async execute() {
    // const {globby} = await import('globby')
    const files = this.files
    const fileList = await globby(files, {cwd: process.cwd()})
    await pmap(
      fileList,
      async (file) => {
        const filepath = path.resolve(file)
        await processFile(filepath)
      },
      cpus().length - 1 // yes
    )
    console.log('[done] process complete')
  }
}

async function processFile(src: string) {
  const {mark} = new MeasureTimer('drawImage')

  const exif = await exifr.parse(src)
  console.log(exif)
  mark('exif')

  const date: Date = exif.CreateDate
  if (!date) {
    console.log('[skip] skip process file because lack exif.CreateDate field')
    return
  }

  const text = moment(date).format('DD/MM/YYYY')

  const meta = await sharp(src).rotate().metadata()
  const width = meta.width
  const height = meta.height
  console.log(meta)
  mark('meta')

  const c = canvas.createCanvas(width, height)
  const ctx = c.getContext('2d')
  mark('canvas prepare')

  const buf = await sharp(src).rotate().raw().ensureAlpha().toBuffer()
  mark('decode')

  const u8ClampArr = new Uint8ClampedArray(buf.buffer, buf.byteOffset, buf.byteLength)
  const imageData = canvas.createImageData(u8ClampArr, width, height)
  ctx.putImageData(imageData, 0, 0)
  mark('drawImage')

  // 有不支持的格式, 不能依赖 canvas 库去 decode
  // const img = await canvas.loadImage(src)
  // ctx.drawImage(img, 0, 0, width, height)

  // ctx.font = '100px "MPlus 1 code"'
  ctx.font = '100px "Ubuntu Mono"'
  ctx.fillStyle = 'white'

  ctx.textDrawingMode = 'glyph'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'

  ctx.fillText(text, width - width * 0.01, height - height * 0.01)
  mark('drawText')

  // compress
  const newImageData = ctx.getImageData(0, 0, width, height)
  const encoded = await mozjpeg.encode(
    Buffer.from(newImageData.data),
    newImageData.width,
    newImageData.height
  )
  mark('mozjpeg encode')

  {
    const ext = path.extname(src)
    const dir = path.dirname(src)
    const basename = path.basename(src, ext)
    const newfile = `${dir}/with-date/${basename}.with-date.jpeg`
    console.log('[file]: %s', newfile)
    fs.outputFileSync(newfile, encoded)
  }
}
