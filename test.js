
const cheerio = require('cheerio')
const request = require('superagent')

request
  .post('http://www.juliettecoimmobilier.com/results')
  .type('form')
  .send({
    'site_frm_select_commune': 'CHAMONIX MONT BLANC',
    'site_frm_select_budget': '0-270000'
  })
  .then(res => {
    let $ = cheerio.load(res.text)
    const $list = $('.products-list > li')
    console.log($list)
    // console.log(res)
  })
  .catch(e => console.log('ERR', e))
