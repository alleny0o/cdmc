import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'navLinkColor',
      title: 'Nav Link Color',
      type: 'color',
    }),
    defineField({
      name: 'navLinkHoverColor',
      title: 'Nav Link Hover Color',
      type: 'color',
    }),
    defineField({
      name: 'mobileMenuBackgroundColor',
      title: 'Mobile Menu Background Color',
      type: 'color',
      description: 'Defaults to header background color if not set',
    }),
    defineField({
      name: 'mobileMenuTextColor',
      title: 'Mobile Menu Text Color',
      type: 'color',
      description: 'Defaults to nav link color if not set',
    }),
    defineField({
      name: 'navLinkSize',
      title: 'Nav Link Size',
      type: 'number',
      description: '8 = tiny, 14 = default, 20 = large',
      initialValue: 14,
      validation: (Rule) => Rule.min(8).max(20),
    }),
    defineField({
      name: 'logoSize',
      title: 'Logo Size',
      type: 'number',
      description: '40 = small, 64 = medium, 80 = large',
      initialValue: 64,
      validation: (Rule) => Rule.min(40).max(80),
    }),
    defineField({
      name: 'headerBehavior',
      title: 'Header Behavior',
      type: 'string',
      options: {
        list: [
          {title: 'Fixed (always visible)', value: 'fixed'},
          {title: 'Smart (hides on scroll down, shows on scroll up)', value: 'smart'},
        ],
        layout: 'radio',
      },
      initialValue: 'fixed',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Header'}
    },
  },
})