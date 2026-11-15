export const steps = [
  ['24685.svg', 'Choose location', 'Choose your and find\nyour best car'],
  ['52c17.svg', 'Pick-up date', 'Select your pick up date and\ntime to book your car'],
  ['d9226.svg', 'Book your car', 'Book your car and we will deliver\nit directly to you'],
] as const

export const benefits = [
  ['ae190.svg', 'Best price guaranteed', 'Find a lower price? We’ll refund you 100%\nof the difference.'],
  ['f49ab.svg', 'Experience driver', 'Don’t have driver? Don’t worry, we have many\nexperienced driver for you.'],
  ['e0d73.svg', '24 hour car delivery', 'Book your car anytime and we will deliver it\ndirectly to you.'],
  ['df123.svg', '24/7 technical support', 'Have a question? Contact Rentcars support\nany time when you have problem.'],
] as const

export const cars = [
  { name: 'Jaguar XE L P250', image: '16376.png', rating: '4.8', reviews: '2.436', seats: 4, price: '$1,800' },
  { name: 'Audi R8', image: '2cca3.png', rating: '4.6', reviews: '1.936', seats: 2, price: '$2,100' },
  { name: 'BMW M3', image: 'd9173.png', rating: '4.5', reviews: '2.036', seats: 4, price: '$1,600' },
  { name: 'Lamborghini Huracan', image: 'ddb3b.png', rating: '4.3', reviews: '2.236', seats: 2, price: '$2,300' },
] as const

const review = "I feel very secure when using caretall's services. Your customer care team is very enthusiastic and the driver is always on time."
export const testimonials = [
  { name: 'Jenny Wilson', location: 'From New York, US', text: 'I have been using your services for 3 years. Your service is great, I will continue to use your service.', image: 'd73cc.png' },
  { name: 'Charlie Johnson', location: 'From New York, US', text: review, image: 'd73cc.png' },
  { name: 'Charlie Johnson', location: 'From New York, US', text: review, image: 'bd4d8.png' },
] as const
