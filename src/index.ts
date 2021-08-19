import canvas from 'canvas'
import clipanion from 'clipanion'
import sharp from 'sharp'
import exifr from 'exifr'
import moment from 'moment'
import fs from 'fs'

main()

async function main() {
  drawImage('/Users/magicdawn/Downloads/IMG_6834.HEIC')
}

async function drawImage(src: string) {
  const meta = await sharp(src).rotate().metadata()
  const width = meta.width
  const height = meta.height

  const exif = await exifr.parse(src)
  console.log(exif)
  console.log(meta)

  const date = exif.CreateDate
  if (date) {
    const s = moment(date).format('YYYY-MM-DD')
  }

  const c = canvas.createCanvas(width, height)
  const ctx = c.getContext('2d')

  const buf = await sharp(src).rotate().raw().ensureAlpha().toBuffer()

  const u8ClampArr = new Uint8ClampedArray(buf.buffer, buf.byteOffset, buf.byteLength)
  const imageData = canvas.createImageData(u8ClampArr, width, height)
  ctx.putImageData(imageData, 0, 0)

  // 有不支持的格式
  // const img = await canvas.loadImage(src)
  // ctx.drawImage(img, 0, 0, width, height)

  // ctx.font = '100px "MPlus 1 code"'
  ctx.font = '100px "Ubuntu Mono"'
  ctx.fillStyle = 'white'

  ctx.textDrawingMode = 'glyph'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'

  const text = '2021 / 08 / 20'
  ctx.fillText(text, width - width * 0.01, height - height * 0.01)

  const newbuf = c.toBuffer()
  fs.writeFileSync(__dirname + '/test.png', newbuf)
}
