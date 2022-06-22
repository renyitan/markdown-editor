import { Descendant } from 'slate';

export const ANNOTATIONS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKE: 'strike',
  CODE: 'code',
};

export interface IHotKeys {
  [key: string]: string;
}

export const HOTKEYS: IHotKeys = {
  'mod+b': ANNOTATIONS.BOLD,
  'mod+i': ANNOTATIONS.ITALIC,
  'mod+`': ANNOTATIONS.CODE,
  'mod+u': ANNOTATIONS.UNDERLINE,
};

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '## Simple Markdown Editor\n\n\nStart typing in markdown on the right!\n***\n\n\nLorem markdownum, ore cavis dote mutat sopistis, et domini, sit suoque, pro Argus ulla venenis. Victor qui tamen per est **sine** gaudens nitentia morsus.\n\n\n1. Esse has non Cyclopis nautae pueroque coactus\n2. Percutiensque accendit cornu fumat venefica regemque quid\n3. Harundinibus quod et exit valido succiso Gorgone\n4. Dissimilemque inguina Hesperien quaedam\n5. Bulla vir semper quem galeae\n6. Ferre iuvenes quod ibitis de induiturque solacia\n\n\n## Quod cum\n\n\nTemeraria sine abstraxit inquit usus pedesque et et certa, sic setius et. Fontibus surge. Mitto mundi amplius auspicio cepit successibus vera effodiuntur omine incerti inopes arbor, sed *illam nomenque*, post. Madidos at concipiunt nisi humana adeant vestemque sacra; aquis nescius propago, ea. Aliquam negat, qua in vulnus concordare homines futura.\n\n\n```js\n    var circuit = powerpoint_export_soap.bing(3, chip(\n            wavelengthTerminalBalancing, delPngModifier, 852057), virusFirewall)\n            * media;\n    if (headerLog + pitch_e_upnp < gopher) {\n        virtual_wave_gnutella(pupStatic, lpi_backbone_repository, publishing);\n    }\n    voip_frequency = smartphone_site_so(cdn, hypertext_degauss(\n            laserTelecommunicationsThread));\n```\n\n\n\n\n',
      },
    ],
  },
];
