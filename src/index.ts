import canvas from 'canvas'
import clipanion from 'clipanion'
import sharp from 'sharp'

async function drawImage(src: string) {
  const meta = await sharp(src).rotate().metadata()
  const width = meta.width
  const height = meta.height

  const c = canvas.createCanvas(width, height)
  const ctx = c.getContext('2d')

  const img = await canvas.loadImage(src)
  ctx.drawImage(img, 0, 0, width, height)

  ctx.font = '12px "Comic Sans"'
  ctx.textAlign = 'right'
  ctx.fillStyle = ''

  const text = ''
  ctx.fillText('Everyone hates this font :(', 250, 10)
  ctx.measureText('')
}
