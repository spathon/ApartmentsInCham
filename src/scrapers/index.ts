import type { Scraper } from '../types/scraper.js'
import aim from './aim.js'
import antoineImmo from './antoineImmo.js'
import chamImmo from './chamImmo.js'
import laFloriaImmobilier from './laFloriaImmobilier.js'
import clipImmobilier from './clipImmobilier.js'
import arveImmobilier from './arveImmobilier.js'
import barnesMontBlanc from './barnesMontBlanc.js'
import cimalpes from './cimalpes.js'
import alpesChalets from './alpesChalets.js'
import chxImmobilier from './chxImmobilier.js'
import montBlancImmobilier from './montBlancImmobilier.js'
import century21MBI from './century21MBI.js'
import schussImmobilier from './schussImmobilier.js'
import chevallierImmobilier from './chevallierImmobilier.js'
import peakImmobilier from './peakImmobilier.js'
import taraImmobilier from './taraImmobilier.js'
import foncia from './foncia.js'

export const scrapers: Record<string, Scraper> = {
  aim,
  antoineImmo,
  chamImmo,
  lafloriaImmobilier: laFloriaImmobilier,
  clipImmobilier,
  arveImmobilier,
  barnesMontBlanc,
  cimalpes,
  alpesChalets,
  chxImmobilier,
  montBlancImmobilier,
  century21MBI,
  schussImmobilier,
  chevallierImmobilier,
  peakImmobilier,
  taraImmobilier,
  foncia,
}
