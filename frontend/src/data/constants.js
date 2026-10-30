// Static site configuration — everything else comes from the API.

export const DEALERSHIP = {
  name: 'AutoDeal Motors',
  address: '2450 Motorway Boulevard, Springfield, IL 62704',
  phone: '(555) 123-4567',
  email: 'sales@autodealmotors.com',
  hours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 8:00 PM' },
    { days: 'Saturday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: '11:00 AM – 5:00 PM' },
  ],
};

export const MAKES = [
  'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia',
  'Mazda', 'Mercedes-Benz', 'Nissan', 'Porsche', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen',
];

export const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Truck', 'Van', 'Convertible', 'Wagon'];

export const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

export const TRANSMISSIONS = ['Automatic', 'Manual', 'CVT', 'PDK'];

export const YEARS = Array.from({ length: 2027 - 2018 }, (_, i) => 2026 - i);
