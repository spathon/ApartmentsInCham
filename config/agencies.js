const agencies = [
  {
    id: 'chamonixProperty',
    title: 'Chamonix Property (Mountain Base)',
    url: 'http://www.chamonix-property.com/search_results/ajax_request.php',
    post: {
      id_lang: 1,
      action: 'default_search_property',
      parameters: '{"id_page":"40","SEARCH_id_country":"1","fname":"search_results.php","SEARCH_id_resort":"19","SEARCH_id_accom_type":"Any","SEARCH_id_budget":"1","sort_by":null}',
      id_website: 2
    },
    custom: true
  },
  {
    id: 'chamImmo',
    title: 'Cham Immo',
    url: 'http://www.cham-immo.com/en/sales',
    post: {
      'transaction_search[prix_max]': 270000,
      'transaction_search[commune]': 31891
    }
  },
  {
    id: 'juliettecoimmobilier',
    title: 'Juliette and co immobilier',
    url: 'http://www.juliettecoimmobilier.com/results',
    post: {
      'site_frm_select_commune': 'CHAMONIX MONT BLANC',
      'site_frm_select_budget': '0-270000'
    }
  },
  {
    id: 'cosmiqueImmobilier',
    title: 'Cosmique Immobilier',
    url: 'http://cosmique-immobilier.com/en/search?city_id=2&type=1&price_range=0-350000'
  },
  {
    id: 'arveImmobilier',
    title: 'Arve Immobilier',
    url: 'http://www.arve-immobilier.com/en/purchase/ville-CHAMONIX+MONT+BLANC/cp-74400/max-290000/'
  },
  {
    id: 'grossetGrange',
    title: 'Grosset GranGe',
    url: 'http://grossetgrange.com/fr/resultat/?lang=fr&location%5BCHAMONIX+MONT+BLANC%5D=CHAMONIX+MONT+BLANC&maxprix=300000&nbref=&search=ENVOYER&PHPSESSID=1e19c507d932c71bb6a457876bd0a90b&240planBAK=R2339304326&240plan=R3762709807'
  },
  {
    id: 'lafloriaImmobilier',
    title: 'lafloria-immobilier',
    url: 'http://www.lafloria-immobilier.com/en/search?type=2&city_id=2&price_range=0-300000&Trouver=Find#properties'
  }
]

module.exports = agencies
