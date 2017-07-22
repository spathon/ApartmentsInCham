const agencies = [

  {
    id: 'taraImmobilier',
    title: 'Tara Immobilier',
    baseUrl: 'http://www.tara-immobilier.com',
    url: 'http://www.tara-immobilier.com/recherche,incl_recherche_basic_ajax.htm?ci=740056&surfacemin=Min&surfacemax=Max&surf_terrainmin=Min&surf_terrainmax=Max&pxmin=Min&pxmax=280000&idqfix=1&idtt=2&pres=basic&lang=fr&tri=d_dt_crea&_=1500727810449'
  },

  {
    id: 'century21',
    title: 'century21',
    baseUrl: 'https://www.century21chevallierimmobilier.com',
    url: 'https://www.century21chevallierimmobilier.com/annonces/achat/v-chamonix+mont+blanc/s-0-/st-0-/b-0-280000/'
  },
  {
    id: 'aim',
    title: 'AIM',
    baseUrl: 'http://www.agenceaim.com',
    url: 'http://www.agenceaim.com/summary.php?seltype=location&subtype=1'
  },
  {
    id: 'alpImmo',
    title: 'Alp\'Immo',
    baseUrl: 'http://www.alpimmo.fr',
    url: 'http://www.alpimmo.fr/en/search/',
    post: {
      price: '0000000000-0000300000',
      city: '32274'
    }
  },
  {
    id: 'antoineImmo',
    title: 'Antoine Immobilier',
    baseUrl: 'http://www.antoine-immo.com',
    url: 'http://www.antoine-immo.com/en/all-property-for-sale'
  },
  {
    id: 'chamonixProperty',
    title: 'Chamonix Property (Mountain Base)',
    baseUrl: 'http://www.chamonix-property.com',
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
    baseUrl: 'http://www.cham-immo.com',
    url: 'http://www.cham-immo.com/en/sales',
    post: {
      'transaction_search[prix_max]': 270000,
      'transaction_search[commune]': 31891
    }
  },
  {
    id: 'juliettecoimmobilier',
    title: 'Juliette and co immobilier',
    baseUrl: 'http://www.juliettecoimmobilier.com',
    url: 'http://www.juliettecoimmobilier.com/results',
    post: {
      'site_frm_select_commune': 'CHAMONIX MONT BLANC',
      'site_frm_select_budget': '0-270000'
    }
  },
  {
    id: 'cosmiqueImmobilier',
    title: 'Cosmique Immobilier',
    baseUrl: 'http://cosmique-immobilier.com',
    url: 'http://cosmique-immobilier.com/en/search?city_id=2&type=1&price_range=0-350000'
  },
  {
    id: 'arveImmobilier',
    title: 'Arve Immobilier',
    baseUrl: 'http://www.arve-immobilier.com',
    url: 'http://www.arve-immobilier.com/en/purchase/ville-CHAMONIX+MONT+BLANC/cp-74400/max-290000/'
  },
  {
    id: 'grossetGrange',
    title: 'Grosset GranGe',
    baseUrl: 'http://grossetgrange.com',
    url: 'http://grossetgrange.com/fr/resultat/?lang=fr&location%5BCHAMONIX+MONT+BLANC%5D=CHAMONIX+MONT+BLANC&maxprix=300000&nbref=&search=ENVOYER&PHPSESSID=1e19c507d932c71bb6a457876bd0a90b&240planBAK=R2339304326&240plan=R3762709807'
  },
  {
    id: 'lafloriaImmobilier',
    title: 'lafloria-immobilier',
    baseUrl: 'http://www.lafloria-immobilier.com',
    url: 'http://www.lafloria-immobilier.com/en/search?type=2&city_id=2&price_range=0-300000&Trouver=Find#properties'
  }
]

module.exports = agencies
