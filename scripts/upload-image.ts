/**
 * Upload an image to Payload CMS
 * Usage: DATABASE_URI="..." pnpm tsx scripts/upload-image.ts <file-path> [--alt "Alt text"]
 * Example: pnpm tsx scripts/upload-image.ts /path/to/photo.jpg --alt "Team member photo"
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

async function uploadImage() {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error('Usage: pnpm tsx scripts/upload-image.ts <file-path> [--alt "Alt text"]')
    console.error('Example: pnpm tsx scripts/upload-image.ts ./photo.jpg --alt "Profile photo"')
    process.exit(1)
  }

  const filePath = args[0]
  const altIndex = args.indexOf('--alt')
  const alt = altIndex !== -1 && args[altIndex + 1] ? args[altIndex + 1] : ''

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  const payload = await getPayload({ config })

  try {
    console.log(`📤 Uploading image: ${filePath}...`)

    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: alt || fileName,
      },
      file: {
        data: fileBuffer,
        mimetype: getMimeType(fileName),
        name: fileName,
        size: fileBuffer.length,
      },
    })

    console.log(`✅ Image uploaded successfully!`)
    console.log(`   ID: ${media.id}`)
    console.log(`   Filename: ${media.filename}`)
    console.log(`   Alt: ${media.alt}`)
    console.log(`   URL: ${media.url}`)
    console.log(`   Size: ${(media.filesize / 1024).toFixed(2)} KB`)
    console.log(`\n💡 Use this ID to attach the image: ${media.id}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error uploading image:', error)
    process.exit(1)
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

uploadImage()
