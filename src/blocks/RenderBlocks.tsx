import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

// Imports des blocs existants (Vos noms de composants)
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Import du nouveau bloc
import { BentoGrid } from '@/blocks/BentoGrid/Component'

// Import du séparateur visuel réutilisable
import { SectionSeparator } from '@/components/ui/SectionSeparator'

// Mapping Slug -> Composant
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  bentoGrid: BentoGrid,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="relative" key={index}>
                  
                  {/* --- SÉPARATEUR RÉUTILISABLE --- */}
                  <SectionSeparator />

                  {/* Le Bloc de contenu avec marge verticale RÉDUITE
                      Avant : my-16 md:my-24 (Trop grand)
                      Après : my-8 md:my-12 (Plus compact)
                  */}
                  <div className="my-8 md:my-12">
                    {/* @ts-expect-error - Les props sont dynamiques selon le bloc */}
                    <Block {...block} />
                  </div>
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}