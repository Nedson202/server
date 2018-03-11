import businesses from '../model/business';

export function sortQuery(req, res, next) {
  const { location, category } = (req.query);

  // if (location) {
  //   const filteredBusiness = businesses.filter(business =>
  //     location.toLowerCase() === business.location);
  //   if (filteredBusiness.length === 0) {
  //     res.status(404).json({
  //       message: 'Business not found',
  //       error: true
  //     });
  //   }
  //   res.status(200).json(filteredBusiness);
  // }
  //
  // if (category) {
  //   const filteredBusiness = businesses.filter(business =>
  //     category.toLowerCase() === business.category);
  //   if (filteredBusiness.length === 0) {
  //     res.status(404).json({
  //       message: 'Business not found',
  //       error: true
  //     });
  //   }
  //   res.status(200).json(filteredBusiness);
  // }
  //
  // next();

  if (location || category) {
    businesses.forEach((business) => {
      if (location === business.location) {
        res.status(200).json(business)
      }
      if (category === business.category) {
        res.status(200).json(business)
      }
    })
    res.status(404).json({
      message: 'Business not found',
      error: true
    });
  }


  next()
};

export function filterToDelete(req, res, next) {
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    res.status(404).json({
      messsage: 'Business not found',
      error: true
    });
  }

  next();
};
