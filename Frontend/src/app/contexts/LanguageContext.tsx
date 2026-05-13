import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'rtl' | 'ltr';
  textAlign: (align: 'left' | 'right' | 'center') => string;
  flexDirection: (direction?: 'row' | 'col') => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    aboutUs: 'من نحن',
    aboutTitle: 'عن رينبو ترافل',
    services: 'الخدمات',
    offers: 'العروض',
    contact: 'اتصل بنا',
    loginSignup: 'تسجيل الدخول / إنشاء حساب',

    // Search
    searchPlaceholder: 'البحث عن الوجهات، الخدمات، العروض...',
    searchDestinations: 'البحث عن الوجهات...',

    // Hero sections
    welcome: 'مرحباً بكم في رينبو ترافل',
    exploreWorld: 'استكشف العالم معنا',
    journeyBegins: 'الرحلة تبدأ معنا...',
    memoriesYours: 'والذكريات لكم',
    yourTrustedPartner: 'شريككم الموثوق في نابلس، نقدم حلول سفر كاملة وتجارب لا تُنسى حول العالم.',
    discoverDestinations: 'اكتشف وجهات مذهلة',
    topDestinations: 'أفضل وجهات السفر',
    explorePopular: 'استكشف أكثر الدول شعبية التي يحبها الناس زيارتها',
    ourServices: 'خدماتنا',
    completeSolutions: 'حلول سفر كاملة مصممة حسب احتياجاتك. من الحجز إلى التخطيط، نحن نوفر لك كل شيء.',
    specialOffers: 'عروض خاصة',
    offersPageDesc: 'اكتشف عروض سفر رائعة وحزم حصرية لوجهات أحلامك',
    exclusiveDeals: 'عروض حصرية وحزم لتجارب لا تُنسى',
    quickLinks: 'روابط سريعة',
    contactUs: 'اتصل بنا',
    getInTouch: 'نحن هنا لمساعدتك في تخطيط رحلتك المثالية. تواصل معنا اليوم!',

    // Buttons and actions
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    bookNow: 'احجز الآن',
    viewDetails: 'عرض التفاصيل',
    sendMessage: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    submit: 'إرسال',

    // Forms
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    message: 'الرسالة',
    name: 'الاسم',

    // Services
    flightBooking: 'حجز الطيران',
    flightDesc: 'احجز رحلات طيران إلى وجهات حول العالم بأسعار تنافسية وخيارات مرنة.',
    hotelReservations: 'حجز الفنادق',
    hotelDesc: 'اعثر واحجز الإقامة المثالية لرحلتك.',
    tourPackages: 'حزم الجولات',
    tourDesc: 'استكشف حزم الجولات المصممة بعناية والتي تشمل الطيران والفنادق والجولات والأنشطة.',
    visaAssistance: 'مساعدة التأشيرات',
    visaDesc: 'احصل على مساعدة متخصصة في طلبات التأشيرات والوثائق.',
    travelPlanning: 'تخطيط السفر',
    planningDesc: 'دع مستشاري السفر ذوي الخبرة يساعدونك في تخطيط رحلتك المثالية.',

    // Features
    internationalFlights: 'رحلات دولية ومحلية',
    bestFare: 'ضمان أفضل سعر',
    easyCancellation: 'إلغاء وإعادة جدولة سهلة',
    customerSupport: 'دعم العملاء 24/7',
    wideAccommodations: 'مجموعة واسعة من الإقامات',
    bestPrice: 'ضمان أفضل سعر',
    verifiedReviews: 'تقييمات ومراجعات موثقة',
    groupRates: 'أسعار خاصة للمجموعات',
    allInclusive: 'حزم شاملة',
    customizable: 'جداول زمنية قابلة للتخصيص',
    localGuides: 'مرشدون محليون متخصصون',
    privateTours: 'جولات جماعية وخاصة',
    visaConsultation: 'استشارات التأشيرات',
    documentPrep: 'إعداد الوثائق',
    applicationTracking: 'تتبع الطلبات',
    multipleCountries: 'دعم دول متعددة',
    personalized: 'جداول زمنية مخصصة',
    budgetPlanning: 'تخطيط الميزانية',
    activityRecs: 'توصيات الأنشطة',
    travelInsurance: 'خيارات التأمين على السفر',

    // Contact
    contactTitle: 'تواصل معنا',
    questionsHelp: 'لديك أسئلة أو تحتاج مساعدة؟ نحن هنا للمساعدة!',
    officeLocation: 'موقع المكتب',
    nablusCenter: 'مركز مدينة نابلس، الطابق الثاني، نابلس، فلسطين',
    phoneNumber: 'رقم الهاتف',
    available247: 'متوفر 24/7 للاستفسارات',
    emailAddress: 'البريد الإلكتروني',
    respond24h: 'سنرد خلال 24 ساعة',
    followUs: 'تابعنا على وسائل التواصل الاجتماعي',

    // Footer
    allRightsReserved: 'جميع الحقوق محفوظة.',
    rainbowTravel: 'رينبو ترافل والسياحة',

    // Booking
    bookingForm: 'احجز رحلتك',
    selectService: 'اختر الخدمة',
    selectDestination: 'اختر الوجهة',
    selectDate: 'اختر التاريخ',
    numberOfTravelers: 'عدد المسافرين',
    specialRequests: 'طلبات خاصة',
    passportType: 'نوع الجواز',
    palestinian: 'فلسطيني',
    other: 'أخرى',

    // About
    ourStory: 'قصتنا',
    storyText: 'مع أكثر من 15 عاماً من الخبرة في صناعة السفر، كانت رينبو ترافل شريككم الموثوق للرحلات التي لا تُنسى. نحن متخصصون في تقديم حلول سفر شاملة مصممة حسب احتياجاتكم.',
    ourValues: 'قيمنا',
    whyChoose: 'لماذا تختار رينبو ترافل؟',
    ourMission: 'رسالتنا',
    ourVision: 'رؤيتنا',
    competitivePrices: 'أسعار تنافسية',
    pricesDesc: 'نقدم أفضل قيمة مقابل أموالكم مع عروض حصرية وأسعار تنافسية على جميع حزمنا.',
    excellentService: 'خدمة ممتازة',
    serviceDesc: 'فريقنا المهني والودود ملتزم بتقديم خدمة عملاء استثنائية في كل خطوة.',
    organizedTrips: 'رحلات منظمة',
    organizedDesc: 'يتم التخطيط والتنظيم لكل التفاصيل بعناية لضمان أن تكون رحلتكم سلسة وآمنة وخالية من التوتر.',
    continuousOffers: 'عروض مستمرة',
    offersDesc: 'نحدث عروضنا باستمرار لنقدم لكم أفضل الصفقات وأحدث الوجهات.',

    // Auth
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    createAccount: 'إنشاء حساب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    passwordRequired: 'كلمة المرور مطلوبة',
    nameRequired: 'الاسم مطلوب',
    passwordsNotMatch: 'كلمات المرور غير متطابقة',
    invalidEmail: 'البريد الإلكتروني غير صحيح',
    passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    signupSuccess: 'تم إنشاء الحساب بنجاح',
    loginError: 'فشل في تسجيل الدخول',
    signupError: 'فشل في إنشاء الحساب',
    loading: 'جارٍ التحميل...',
    error: 'خطأ',
    success: 'نجح',
    close: 'إغلاق',
    yes: 'نعم',
    no: 'لا',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    page: 'صفحة',
    of: 'من',
    contactToday: 'تواصل معنا اليوم ودعنا نساعدك في تخطيط عطلتك المثالية',
    readyToBook: 'جاهز لحجز رحلتك؟',
    contactCustom: 'تواصل معنا وسننشئ حزمة مخصصة لك فقط',
    cantFind: 'لا تجد ما تبحث عنه؟',
    'Showing {count} destinations matching your search': 'عرض {count} وجهة تتطابق مع بحثك',
    'View All Offers': 'عرض جميع العروض',
    'What Our Customers Say': 'ماذا يقول عملاؤنا',
    'Real experiences from happy travelers': 'تجارب حقيقية من مسافرين سعداء',
    'Ready to Start Your Journey?': 'هل أنت مستعد لبدء رحلتك؟',
    'Book your dream vacation today and create memories that last a lifetime': 'احجز عطلتك المثالية اليوم واصنع ذكريات تدوم مدى الحياة',
    'Contact Us': 'اتصل بنا',
    'Follow Us': 'تابعنا',
    'Rainbow Travel & Tourism': 'رينبو ترافل والسياحة',
    'All rights reserved.': 'جميع الحقوق محفوظة.',
    'Have questions or need assistance? We are here to help! Reach out to us through any of the following channels.': 'هل لديك أسئلة أو تحتاج مساعدة؟ نحن هنا للمساعدة! تواصل معنا عبر أي من القنوات التالية.',
    'Find Us on the Map': 'اعثر علينا على الخريطة',
    'Visit our office at Nablus City Center': 'قم بزيارة مكتبنا في مركز مدينة نابلس',
    'Office Hours': 'ساعات العمل',
    'Sunday - Thursday': 'الأحد - الخميس',
    'Saturday': 'السبت',
    'Emergency support available 24/7 by phone': 'دعم الطوارئ متاح على مدار الساعة عبر الهاتف',
    'Get in Touch': 'تواصل معنا',
    'Send Us a Message': 'أرسل لنا رسالة',
    'Message Sent Successfully!': 'تم إرسال الرسالة بنجاح!',
    'Thank you for contacting us. We will get back to you within 24 hours.': 'شكراً لتواصلك معنا. سنرد خلال 24 ساعة.',
    'Enter your email': 'أدخل بريدك الإلكتروني',
    // About page specific
    ourMissionText: 'تقديم تجارب سفر استثنائية من خلال تقديم حلول سفر شاملة وموثوقة وبأسعار معقولة. نسعى لجعل كل رحلة سلسة ولا تُنسى، مما يضمن عودة عملائنا إلى منازلهم بقصص تستحق المشاركة وذكريات يحتفظون بها إلى الأبد.',
    ourVisionText: 'أن نصبح الوكالة الرائدة في السفر في فلسطين، معروفة بالتزامنا بالتميز والابتكار ورضا العملاء. نتخيل مستقبلاً يكون فيه السفر متاحاً للجميع، وتكون رينبو ترافل الخيار الأول للمسافرين الذين يبحثون عن الجودة والقيمة.',
    whyChooseDesc: 'نحن أكثر من مجرد وكالة سفر - نحن شركاؤك في المغامرة',
    ourCoreValues: 'قيمنا الأساسية',
    loadingServices: 'جارٍ تحميل الخدمات...',
    whyChooseRainbow: 'لماذا تختار رينبو ترافل؟',
    committedToExceptional: 'نحن ملتزمون بتقديم تجارب سفر استثنائية',
    bestValueMoney: 'نقدم أفضل قيمة مقابل أموالكم مع عروض حصرية وأسعار تنافسية.',
    professionalSupport: 'فريقنا المهني والودود ملتزم بتقديم خدمة عملاء استثنائية.',
    wellPlannedItineraries: 'يتم التخطيط والتنظيم لكل التفاصيل بعناية لضمان أن تكون رحلتكم سلسة وآمنة وخالية من التوتر.',
    regularPromotions: 'نحدث عروضنا باستمرار لنقدم لكم أفضل الصفقات وأحدث الوجهات.',
    filterByCountry: 'تصفية حسب البلد',
    allCountries: 'جميع البلدان',
    filterByPrice: 'تصفية حسب السعر',
    allPrices: 'جميع الأسعار',
    under700: 'أقل من 700 دولار',
    between700And1000: '700 - 1000 دولار',
    over1000: 'أكثر من 1000 دولار',
    showingResults: 'عرض {count} نتيجة{plural} لبحثك',
    loadingOffers: 'جارٍ تحميل العروض...',
    reviews: 'تقييمات',
    packageIncludes: 'تشمل الحزمة',
    highlights: 'النقاط البارزة',
    exploreDestinations: 'استكشف الوجهات',
    popularTouristAttractions: 'المعالم السياحية الشهيرة',
    discoverBeachesLandmarks: 'اكتشف الشواطئ الجميلة والمعالم الثقافية والأماكن السياحية',
    failedToSendMessage: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    getInTouchTitle: 'تواصل معنا',
    contactDescription: 'هل لديك أسئلة أو تحتاج مساعدة؟ نحن هنا للمساعدة! تواصل معنا عبر أي من القنوات التالية.',
    sendUsMessage: 'أرسل لنا رسالة',
    messageSentSuccessfully: 'تم إرسال الرسالة بنجاح!',
    thankYouContact: 'شكراً لتواصلك معنا. سنرد خلال 24 ساعة.',
    bookingSubmittedSuccess: 'تم إرسال الحجز بنجاح!',
    bookYourTrip: 'احجز رحلتك',
    completeFormStartJourney: 'أكمل النموذج أدناه لبدء رحلتك',
    bookingType: 'نوع الحجز',
    yourDetails: 'بياناتك',
    destination: 'الوجهة',
    review: 'مراجعة',
    yearsExperience: 'سنوات الخبرة',
    happyTravelers: 'مسافرين سعداء',
    destinations: 'وجهات',
    storyText2: 'نتخصص في تقديم حلول سفر شاملة مصممة حسب احتياجاتكم.',
    storyText3: 'من الحجز إلى التخطيط، نوفر كل شيء لنجعل رحلتكم لا تُنسى.',
    customerFirst: 'العميل أولاً',
    customerFirstDesc: 'عملاؤنا في قلب كل ما نقوم به. نسعى لتجاوز التوقعات وإنشاء ذكريات تدوم.',
  },
  en: {
    // Navigation
    home: 'Home',
    aboutUs: 'About Us',
    aboutTitle: 'About Rainbow Travel',
    services: 'Services',
    offers: 'Offers',
    contact: 'Contact',
    loginSignup: 'Login / Sign Up',

    // Search
    searchPlaceholder: 'Search destinations, services, offers...',
    searchDestinations: 'Search destinations...',

    // Hero sections
    welcome: 'Welcome to Rainbow Travel',
    exploreWorld: 'Explore the World with Us',
    journeyBegins: 'Your Journey Begins...',
    memoriesYours: 'Memories Are Yours',
    yourTrustedPartner: 'Your trusted partner in Nablus, providing complete travel solutions and unforgettable experiences around the world.',
    discoverDestinations: 'Discover Amazing Destinations',
    topDestinations: 'Top Travel Destinations',
    explorePopular: 'Explore the most popular countries that people love to visit',
    ourServices: 'Our Services',
    completeSolutions: 'Complete travel solutions designed for your needs. From booking to planning, we provide everything.',
    specialOffers: 'Special Offers',
    offersPageDesc: 'Discover amazing travel offers and exclusive packages for your dream destinations',
    exclusiveDeals: 'Exclusive deals and packages for unforgettable experiences',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    getInTouch: 'We are here to help you plan your perfect trip. Get in touch today!',

    // Buttons and actions
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    submit: 'Submit',

    // Forms
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    name: 'Name',

    // Services
    flightBooking: 'Flight Booking',
    flightDesc: 'Book flights to destinations around the world with competitive prices and flexible options.',
    hotelReservations: 'Hotel Reservations',
    hotelDesc: 'Find and book the perfect accommodation for your trip.',
    tourPackages: 'Tour Packages',
    tourDesc: 'Explore carefully designed tour packages that include flights, hotels, tours, and activities.',
    visaAssistance: 'Visa Assistance',
    visaDesc: 'Get specialized help with visa applications and documentation.',
    travelPlanning: 'Travel Planning',
    planningDesc: 'Let our experienced travel consultants help you plan your perfect trip.',

    // Features
    internationalFlights: 'International & Domestic Flights',
    bestFare: 'Best Price Guarantee',
    easyCancellation: 'Easy Cancellation & Rescheduling',
    customerSupport: '24/7 Customer Support',
    wideAccommodations: 'Wide Range of Accommodations',
    bestPrice: 'Best Price Guarantee',
    verifiedReviews: 'Verified Reviews & Ratings',
    groupRates: 'Special Group Rates',
    allInclusive: 'All-Inclusive Packages',
    customizable: 'Customizable Itineraries',
    localGuides: 'Expert Local Guides',
    privateTours: 'Group & Private Tours',
    visaConsultation: 'Visa Consultations',
    documentPrep: 'Document Preparation',
    applicationTracking: 'Application Tracking',

    // Auth
    login: 'Login',
    signup: 'Sign Up',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    nameRequired: 'Full name is required',
    passwordsNotMatch: 'Passwords do not match',
    invalidEmail: 'Invalid email address',
    passwordTooShort: 'Password must be at least 6 characters',
    loginSuccess: 'Login successful',
    signupSuccess: 'Account created successfully',
    loginError: 'Login failed',
    signupError: 'Signup failed',
    welcomeBack: 'Welcome Back',
    loginToAccess: 'Login to access your account',
    createYourAccount: 'Create Your Account',
    joinAndExplore: 'Join us and start exploring the world',
    rememberMe: 'Remember me',
    loggingIn: 'Logging in...',
    signingUp: 'Signing up...',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password',
    enterYourFullName: 'Enter your full name',
    createPassword: 'Create a password',
    confirmPassword: 'Confirm Password',
    confirmYourPassword: 'Confirm your password',
    iAgreeToThe: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    creatingAccount: 'Creating Account...',
    createAccount: 'Create Account',
    backToHome: 'Back to Home',
    loadingServices: 'Loading services...',
    whyChooseRainbow: 'Why Choose Rainbow Travel?',
    committedToExceptional: 'We are committed to providing exceptional travel experiences',
    bestValueMoney: 'We offer the best value for your money with exclusive deals and competitive prices.',
    professionalSupport: 'Our professional and friendly team is committed to providing outstanding customer service.',
    wellPlannedItineraries: 'All details are carefully planned and organized to ensure your trip is smooth, safe, and stress-free.',
    regularPromotions: 'We regularly update our offers to provide you with the best deals and latest destinations.',
    filterByCountry: 'Filter by Country',
    allCountries: 'All Countries',
    filterByPrice: 'Filter by Price',
    allPrices: 'All Prices',
    under700: 'Under $700',
    between700And1000: '$700 - $1000',
    over1000: 'Over $1000',
    showingResults: 'Showing {count} result{plural} for your search',
    loadingOffers: 'Loading offers...',
    reviews: 'reviews',
    packageIncludes: 'Package Includes',
    highlights: 'Highlights',
    exploreDestinations: 'Explore Destinations',
    popularTouristAttractions: 'Popular Tourist Attractions',
    discoverBeachesLandmarks: 'Discover beautiful beaches, landmarks, and cultural destinations',
    failedToSendMessage: 'Failed to send message. Please try again.',
    getInTouchTitle: 'Get in Touch',
    contactDescription: 'Have questions or need assistance? We are here to help! Reach out to us through any of the following channels.',
    sendUsMessage: 'Send Us a Message',
    messageSentSuccessfully: 'Message Sent Successfully!',
    thankYouContact: 'Thank you for contacting us. We will get back to you within 24 hours.',
    bookingSubmittedSuccess: 'Booking submitted successfully!',
    bookYourTrip: 'Book Your Trip',
    completeFormStartJourney: 'Complete the form below to start your journey',
    bookingType: 'Booking Type',
    yourDetails: 'Your Details',
    destination: 'Destination',
    review: 'Review',
    yearsExperience: 'Years Experience',
    happyTravelers: 'Happy Travelers',
    destinations: 'Destinations',
    storyText2: 'We specialize in providing comprehensive travel solutions designed for your needs.',
    storyText3: 'From booking to planning, we provide everything to make your journey unforgettable.',
    customerFirst: 'Customer First',
    customerFirstDesc: 'Our customers are at the heart of everything we do. We strive to exceed expectations and create lasting memories.',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    of: 'of',

    // Footer and additional
    contactToday: 'Contact us today and let us help you plan your perfect vacation',
    readyToBook: 'Ready to book your trip?',
    contactCustom: 'Contact us and we\'ll create a custom package just for you',
    cantFind: 'Can\'t find what you\'re looking for?',
    'Showing {count} destinations matching your search': 'Showing {count} destinations matching your search',
    'View All Offers': 'View All Offers',
    'What Our Customers Say': 'What Our Customers Say',
    'Real experiences from happy travelers': 'Real experiences from happy travelers',
    'Ready to Start Your Journey?': 'Ready to Start Your Journey?',
    'Book your dream vacation today and create memories that last a lifetime': 'Book your dream vacation today and create memories that last a lifetime',
    'Contact Us': 'Contact Us',
    'Follow Us': 'Follow Us',
    'Rainbow Travel & Tourism': 'Rainbow Travel & Tourism',
    'All rights reserved.': 'All rights reserved.',
    'Have questions or need assistance? We are here to help! Reach out to us through any of the following channels.': 'Have questions or need assistance? We are here to help! Reach out to us through any of the following channels.',
    'Find Us on the Map': 'Find Us on the Map',
    'Visit our office at Nablus City Center': 'Visit our office at Nablus City Center',
    'Office Hours': 'Office Hours',
    'Sunday - Thursday': 'Sunday - Thursday',
    'Saturday': 'Saturday',
    'Emergency support available 24/7 by phone': 'Emergency support available 24/7 by phone',
    'Get in Touch': 'Get in Touch',
    'Send Us a Message': 'Send Us a Message',
    'Message Sent Successfully!': 'Message Sent Successfully!',
    'Thank you for contacting us. We will get back to you within 24 hours.': 'Thank you for contacting us. We will get back to you within 24 hours.',
    'Enter your email': 'Enter your email',

    // About page specific
    ourMissionText: 'To provide exceptional travel experiences through comprehensive, reliable, and affordable travel solutions. We strive to make every journey smooth and unforgettable, ensuring our customers return home with stories worth sharing and memories they\'ll cherish forever.',
    ourVisionText: 'To become the leading travel agency in Palestine, recognized for our commitment to excellence, innovation, and customer satisfaction. We envision a future where travel is accessible to all, and where Rainbow Travel is the first choice for travelers seeking quality and value.',
    whyChooseDesc: 'We\'re more than just a travel agency – we\'re your partners in adventure',
    ourCoreValues: 'Our Core Values',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('rainbow-travel-language');
    return (saved === 'en' || saved === 'ar') ? saved : 'en';
  });

  const isRTL = language === 'ar';
  const dir: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';

  // Set document direction and language when language changes
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('rainbow-travel-language', language);
  }, [language, dir]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key as keyof typeof translations.ar] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(new RegExp(`\{${paramKey}\}`, 'g'), String(paramValue));
      });
    }

    return text;
  };

  const textAlign = (align: 'left' | 'right' | 'center'): string => {
    if (align === 'center') return 'text-center';
    return isRTL ? (align === 'left' ? 'text-right' : 'text-left') : (align === 'left' ? 'text-left' : 'text-right');
  };

  const flexDirection = (direction: 'row' | 'col' = 'row'): string => {
    if (direction === 'col') return 'flex-col';
    return isRTL ? 'flex-row-reverse' : 'flex-row';
  };

  return (
    <LanguageContext.Provider value={{
      language,
      isRTL,
      t,
      dir,
      textAlign,
      flexDirection,
      toggleLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}