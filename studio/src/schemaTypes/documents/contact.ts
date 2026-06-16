import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'image',
      title: 'Church Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown beside the contact form',
    }),
    defineField({
      name: 'closingMessage',
      title: 'Closing Message',
      type: 'string',
      initialValue: 'May the grace of Christ be with you.',
    }),
    defineField({
      name: 'closingBackgroundColor',
      title: 'Closing Background Color',
      type: 'color',
      description: 'Default is a soft warm yellow',
    }),
    defineField({
      name: 'closingTextColor',
      title: 'Closing Text Color',
      type: 'color',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})