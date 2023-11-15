import { defineConfig, definePlugin } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { myStructure } from './src/sanity/deskStructure'
import { media } from 'sanity-plugin-media'

// custom studio theme
import { theme as _theme } from './src/sanity/theme'
const theme = _theme as import('sanity').StudioTheme

// custom logo component
function MyCustomLogo(props: any) {
  return (
    <div>
      {props.renderDefault({
        ...props,
        title: props.title.toUpperCase(),
      })}
    </div>
  )
}

// create the plugin for the custom logo component
const myLogoPlugin = definePlugin({
  name: 'my-logo-plugin',
  studio: {
    components: {
      logo: (props) => (
        <div>
          {props.renderDefault({
            ...props,
            title: 'chrisnowicki.io',
          })}
        </div>
      ),
    },
  },
})

const config = defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  basePath: '/admin',
  theme,
  title: 'chrisnowicki.io',

  studio: {
    components: {
      logo: MyCustomLogo,
    },
  },

  plugins: [
    deskTool({
      structure: myStructure,
    }),
    visionTool(),
    myLogoPlugin(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})

export default config
