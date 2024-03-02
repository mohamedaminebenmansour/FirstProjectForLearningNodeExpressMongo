exports.getOverview = (req, res) => {
    res.status(200).render('overview', {
        tour: 'this is my exemple',
        'user': "mohamed amin benmansour"
    });
}

exports.getTour =  (req, res) => {
    res.status(200).render('tour',{
      title: "tour"
    });
  }