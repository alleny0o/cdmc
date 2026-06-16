import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'
import {colorInput} from '@sanity/color-input'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

export default defineConfig({
  name: 'cdmc',
  title: 'CDMC',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentListItem().schemaType('settings').title('Site Settings').id('siteSettings'),
            S.documentListItem().schemaType('header').title('Header').id('siteHeader'),
            S.documentListItem().schemaType('footer').title('Footer').id('siteFooter'),
            S.documentListItem().schemaType('home').title('Home Page').id('homePage'),
            S.documentListItem().schemaType('about').title('About Page').id('aboutPage'),
            S.documentListItem().schemaType('contact').title('Contact Page').id('contactPage'),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== 'settings' &&
                item.getId() !== 'header' &&
                item.getId() !== 'footer' &&
                item.getId() !== 'home' &&
                item.getId() !== 'about' &&
                item.getId() !== 'contact',
            ),
          ]),
    }),
    presentationTool({
      previewUrl,
      resolve: {
        mainDocuments: defineDocuments([]),
        locations: {},
      },
    }),
    visionTool(),
    codeInput(),
    colorInput(),
  ],
  schema: {types: schemaTypes},
})