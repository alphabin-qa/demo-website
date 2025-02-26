import {
  Microphone,
  Speaker,
  HardDisk,
  USB,
  Appliances,
  Mobile,
  Laptop,
  Speaker1,
  GoPro,
  WirelessMouse,
  Router,
  Tablet,
  LCD,
  SmartWatch,
  Laptop1,
  MemoryCardReader,
  Printer,
  Projector,
} from "../assets/AllProducts/AllProducts";

const FeatureProductsData = [
  {
    id: "product1",
    img: Microphone,
    header: "Rode NT1-A Condenser Mic",
    price: "₹20,000",
    subdescription:
      "Studio-grade condenser microphone with cardioid pattern for detailed sound capture.",
    reviewCount: "(350)",
    description1:
      "The Rode NT1-A Condenser Microphone provides exceptional clarity, perfect for recording vocals, instruments, and podcasts. Its cardioid pattern ensures isolation from background noise, making it an excellent choice for studio environments. It features a broad frequency response of 20Hz-20kHz, ensuring crisp highs and rich lows.",
    description2:
      "Ideal for professional use, this microphone includes an internal shock mount and pop filter, which minimizes handling noise and plosive sounds. The NT1-A has become a staple in home studios for its affordability and exceptional sound quality, allowing users to record with clarity and precision.",
    additionalInfoFeatures: [
      "Internal shock mount",
      "Broad frequency response (20Hz-20kHz)",
      "Cardioid polar pattern",
      "Includes pop filter and mic mount",
    ],
    additionalInfoHighlight: [
      "Studio-grade quality",
      "Durable construction for long-term use",
      "Ideal for vocals and instruments",
    ],
  },
  {
    id: "product2",
    img: Speaker,
    header: "JBL Charge 4 Bluetooth Speaker",
    price: "₹12,000",
    subdescription:
      "Portable, waterproof speaker with deep bass and up to 20 hours of playtime.",
    reviewCount: "(500)",
    description1:
      "The JBL Charge 4 delivers deep bass and a clear sound profile, perfect for both indoor and outdoor environments. It features an IPX7 waterproof rating, making it ideal for poolside, beach, or shower use. With its large battery capacity, it offers up to 20 hours of continuous playtime, making it a great companion for long outdoor events or parties.",
    description2:
      "With JBL's Bass Radiators, you can feel the deep bass with each beat. The Charge 4 also includes a built-in power bank, allowing you to charge your devices while on the go, making it a versatile addition to your audio collection. Its durable fabric and rugged rubber housing ensure it can withstand outdoor conditions.",
    additionalInfoFeatures: [
      "IPX7 waterproof rating",
      "Bass Radiators for enhanced bass",
      "20 hours of continuous playtime",
      "Power bank to charge devices",
    ],
    additionalInfoHighlight: [
      "Bluetooth 4.2 connectivity",
      "Available in several colors (Black, Red, Blue)",
      "Built-in microphone for hands-free calling",
    ],
  },
  {
    id: "product3",
    img: HardDisk,
    header: "Seagate 4TB External Hard Drive",
    price: "₹7,000",
    subdescription:
      "High-capacity external hard drive with fast data transfer speeds, perfect for backups and media storage.",
    reviewCount: "(800)",
    description1:
      "The Seagate 4TB External Hard Drive provides ample space for backups, photos, videos, and music. It features a fast USB 3.0 connection for rapid data transfers and is compatible with both Windows and Mac devices, offering a plug-and-play experience.",
    description2:
      "This hard drive is designed to store large files effortlessly, making it an ideal solution for photographers, videographers, and anyone in need of extra storage. Its compact and portable design means you can take your data with you wherever you go, and with 4TB of space, you won't run out of room any time soon.",
    additionalInfoFeatures: [
      "4TB storage capacity",
      "USB 3.0 for fast data transfers",
      "Compatible with Windows and Mac",
      "Portable and compact design",
    ],
    additionalInfoHighlight: [
      "Automatic backup software included",
      "Available in black and silver",
      "Ideal for media professionals",
    ],
  },
  {
    id: "product4",
    img: USB,
    header: "SanDisk Ultra Dual Drive 32GB USB 3.0",
    price: "₹1,200",
    subdescription:
      "Dual USB drive with USB Type-C and USB-A connectivity for seamless file transfer across devices.",
    reviewCount: "(450)",
    description1:
      "The SanDisk Ultra Dual Drive is the perfect solution for users who need to transfer files between devices with USB-C and USB-A ports. With 32GB of storage and USB 3.0 speeds, it ensures quick file transfers between smartphones, tablets, and laptops.",
    description2:
      "Its sleek design and retractable USB connectors make it portable and easy to use. No need for extra adapters—simply plug it into any USB-C or USB-A port. The drive is built to withstand everyday wear and tear, ensuring reliable performance over time.",
    additionalInfoFeatures: [
      "32GB storage capacity",
      "Dual connectors (USB-C and USB-A)",
      "USB 3.0 transfer speeds",
      "Retractable design",
    ],
    additionalInfoHighlight: [
      "Compatible with Android and Mac devices",
      "Compact and portable",
      "Fast file transfers for photos and videos",
    ],
  },
  {
    id: "product5",
    img: GoPro,
    header: "GoPro HERO10 Black",
    price: "₹49,999",
    subdescription:
      "Capture your most extreme moments in 5.3K resolution, with enhanced stabilization and waterproof design.",
    reviewCount: "(1200)",
    description1:
      "The GoPro HERO10 Black is designed for thrill-seekers and adventure enthusiasts. Offering 5.3K resolution at 60fps, this action camera ensures the sharpest footage in even the toughest conditions. Its HyperSmooth 4.0 technology stabilizes the footage for ultra-smooth videos, even during high-intensity activities like surfing, snowboarding, or skydiving.",
    description2:
      "The GoPro HERO10 Black is also waterproof up to 10 meters, and its rugged build can withstand drops, making it perfect for outdoor adventures. With Wi-Fi and Bluetooth capabilities, you can easily share footage through the GoPro app, making it seamless for those who need to share content on-the-go.",
    additionalInfoFeatures: [
      "Waterproof to 10 meters",
      "5.3K video at 60fps",
      "HyperSmooth 4.0 video stabilization",
      "Voice control and hands-free operation",
      "Front and rear LCD touchscreens",
      "Built-in Wi-Fi for seamless sharing",
    ],
    additionalInfoHighlight: [
      "Capture images at 23MP for incredible detail",
      "Record videos at 4K 120fps for slow-motion footage",
      "Compatible with GoPro accessories and mounts",
    ],
  },
  {
    id: "product6",
    img: WirelessMouse,
    header: "Logitech MX Master 3 Wireless Mouse",
    price: "₹7,499",
    subdescription:
      "The ultimate wireless mouse for productivity with ergonomic design, precision tracking, and customizable buttons.",
    reviewCount: "(980)",
    description1:
      "The Logitech MX Master 3 is an advanced wireless mouse designed to enhance productivity. It features an ergonomic design that fits comfortably in your hand, making it ideal for long working hours. The mouse offers precise tracking with its Darkfield laser sensor, ensuring smooth movement on virtually any surface, including glass.",
    description2:
      "Equipped with customizable buttons, the MX Master 3 allows you to set shortcuts that enhance your workflow. Its USB-C rechargeable battery lasts up to 70 days on a single charge, and the mouse can be paired with multiple devices at once, offering seamless switching between devices.",
    additionalInfoFeatures: [
      "Ergonomic design with sculpted shape for maximum comfort",
      "Customizable buttons for increased productivity",
      "Precision tracking on any surface with Darkfield laser sensor",
      "USB-C rechargeable with a 70-day battery life",
      "Multi-device pairing and Easy-Switch button",
    ],
    additionalInfoHighlight: [
      "Works with Windows, macOS, and Linux",
      "Connect via Bluetooth or USB receiver",
      "Ideal for designers, editors, and professionals",
    ],
  },
  {
    id: "product7",
    img: Router,
    header: "TP-Link Archer AX73 Wi-Fi 6 Router",
    price: "₹10,999",
    subdescription:
      "Wi-Fi 6 router with ultra-fast speeds, greater efficiency, and wider coverage for your home network.",
    reviewCount: "(600)",
    description1:
      "The TP-Link Archer AX73 is a Wi-Fi 6 router that offers blazing-fast speeds up to 5400 Mbps, making it perfect for gaming, streaming, and multi-device households. With improved efficiency, the router supports multiple devices simultaneously without sacrificing performance, thanks to the latest Wi-Fi 6 technology.",
    description2:
      "Equipped with 4 high-gain antennas and Beamforming technology, the Archer AX73 delivers stronger signals and broader coverage, ensuring stable and fast internet in all corners of your home. It also features a powerful 6-core processor that can handle heavy network traffic seamlessly, delivering uninterrupted online experiences.",
    additionalInfoFeatures: [
      "Wi-Fi 6 technology for fast and efficient wireless speeds",
      "Supports up to 5GHz speeds for high-speed internet",
      "4 high-gain antennas with Beamforming for enhanced signal strength",
      "6-core processor for smoother performance",
      "Advanced security with WPA3 encryption",
    ],
    additionalInfoHighlight: [
      "Gigabit Ethernet ports for wired devices",
      "Easy setup via TP-Link Tether app",
      "Compatible with Alexa and Google Assistant for voice control",
    ],
  },
  {
    id: "product8",
    img: Tablet,
    header: "Apple iPad Air (2022, 5th Gen)",
    price: "₹54,900",
    subdescription:
      "Powerful 10.9-inch iPad with A15 Bionic chip, Touch ID, and support for Apple Pencil and Magic Keyboard.",
    reviewCount: "(800)",
    description1:
      "The Apple iPad Air (2022) brings top-tier performance with the powerful A15 Bionic chip, delivering high-speed performance for work, play, and creative tasks. With a 10.9-inch Liquid Retina display, the iPad Air offers crisp visuals and vibrant colors for immersive experiences, whether you're browsing, watching content, or creating art.",
    description2:
      "This iPad supports the Apple Pencil 2nd generation and Magic Keyboard, making it a versatile tool for digital artists and professionals. It features Touch ID for secure login and payment, and with the improved 12MP front-facing camera, FaceTime calls and selfies look sharper and clearer.",
    additionalInfoFeatures: [
      "A15 Bionic chip for performance and efficiency",
      "10.9-inch Liquid Retina display with True Tone",
      "Support for Apple Pencil (2nd Gen) and Magic Keyboard",
      "12MP front camera for improved video calls",
      "Touch ID for secure access and payments",
    ],
    additionalInfoHighlight: [
      "Storage options: 64GB, 256GB, and 512GB",
      "Available in various colors: Space Gray, Pink, Purple, Blue, and Starlight",
      "Supports 5G connectivity for fast internet speeds",
    ],
  },
  {
    id: "product9",
    img: LCD,
    header: "Samsung 32-inch UHD 4K Smart TV",
    price: "₹35,999",
    subdescription:
      "Ultra-high-definition display with vibrant colors, HDR support, and smart connectivity for seamless entertainment.",
    reviewCount: "(1500)",
    description1:
      "The Samsung 32-inch UHD 4K Smart TV offers incredible picture clarity with its 4K UHD display. Equipped with HDR10+ technology, it brings out the details in both dark and bright scenes, creating a more immersive viewing experience. The TV supports a wide color gamut, ensuring that every scene is rich and vibrant.",
    description2:
      "This smart TV features Samsung's Tizen OS, providing access to popular streaming apps like Netflix, YouTube, and Prime Video. The built-in voice assistant, Bixby, allows for hands-free control, and you can also connect to Alexa or Google Assistant for more options. With multiple HDMI and USB ports, you can easily connect gaming consoles, soundbars, or external storage devices.",
    additionalInfoFeatures: [
      "4K UHD resolution for crystal-clear picture quality",
      "HDR10+ for enhanced brightness and contrast",
      "Samsung Tizen OS for smart features",
      "Voice control with Bixby, Alexa, or Google Assistant",
      "Multiple HDMI and USB ports for connectivity",
    ],
    additionalInfoHighlight: [
      "Size: 32 inches with a 16:9 aspect ratio",
      "Connectivity: HDMI 2.0, USB, and Bluetooth",
      "Supports Netflix, YouTube, Disney+, and more",
    ],
  },
  {
    id: "product10",
    img: SmartWatch,
    header: "Apple Watch Series 7",
    price: "₹41,900",
    subdescription:
      "Smartwatch with a larger always-on display, advanced fitness tracking, and seamless integration with iPhone.",
    reviewCount: "(2000)",
    description1:
      "The Apple Watch Series 7 features a 41mm or 45mm always-on display, offering more screen space for better visibility and interaction. It's designed with a more durable, crack-resistant front crystal and a water-resistant case, making it ideal for active lifestyles and outdoor adventures.",
    description2:
      "Equipped with advanced fitness and health tracking features, including heart rate monitoring, ECG, and blood oxygen measurement, the Series 7 provides comprehensive health insights. It integrates seamlessly with your iPhone, allowing you to receive notifications, make calls, and track your activities directly from your wrist.",
    additionalInfoFeatures: [
      "Always-on display with 20% more screen area",
      "Water-resistant up to 50 meters",
      "Advanced health tracking features (ECG, blood oxygen)",
      "Customizable watch faces and bands",
    ],
    additionalInfoHighlight: [
      "Compatible with iOS 15 or later",
      "Supports Apple Pay for easy payments",
      "Battery life: Up to 18 hours on a single charge",
    ],
  },

  {
    id: "product11",
    img: Laptop1,
    header: "Dell XPS 13 (2021) Laptop",
    price: "₹1,29,999",
    subdescription:
      "Ultra-portable laptop with a sleek design, powerful performance, and long battery life, perfect for professionals and students.",
    reviewCount: "(890)",
    description1:
      "The Dell XPS 13 offers a perfect blend of performance and portability, powered by the latest Intel Core i7 processor and integrated Intel Iris Xe graphics. With a 13.4-inch InfinityEdge display, the laptop provides an immersive viewing experience with stunning resolution and vivid colors. This premium laptop is designed for both work and play, making it ideal for students, professionals, and creatives.",
    description2:
      "The laptop's ultra-slim design and lightweight build make it easy to carry, while its long-lasting battery ensures you can work for up to 12 hours on a single charge. The XPS 13 is equipped with a backlit keyboard, a precision touchpad, and multiple ports for seamless connectivity, including USB-C and Thunderbolt 4 for fast data transfer and charging.",
    additionalInfoFeatures: [
      "13.4-inch InfinityEdge touchscreen display",
      "Intel Core i7-1165G7 processor",
      "512GB SSD storage with 16GB RAM",
      "Intel Iris Xe graphics",
      "Backlit keyboard and precision touchpad",
      "Up to 12 hours of battery life",
    ],
    additionalInfoHighlight: [
      "Weight: 1.2 kg, ultra-portable design",
      "Resolution: 1920 x 1200 pixels (Full HD+)",
      "OS: Windows 11 Pro",
      "Fingerprint reader for secure login",
    ],
  },
  {
    id: "product12",
    img: MemoryCardReader,
    header: "SanDisk Extreme Pro 3.0 USB-C Memory Card Reader",
    price: "₹2,999",
    subdescription:
      "High-speed memory card reader that supports SD, microSD, and CF cards, with USB-C connectivity for fast data transfer.",
    reviewCount: "(150)",
    description1:
      "The SanDisk Extreme Pro USB-C Memory Card Reader is designed for professionals who require high-speed data transfer for 4K and 8K videos, photos, and large files. With support for SD, microSD, and CF cards, it is versatile and suitable for a wide range of memory cards used by photographers, videographers, and content creators.",
    description2:
      "This card reader uses USB 3.0 and USB-C for fast data transfer speeds of up to 500MB/s, reducing the time required to transfer large files. Its compact and portable design ensures it can be easily carried in a bag or pocket. The rugged build provides durability for on-the-go use, making it perfect for outdoor photographers and field professionals.",
    additionalInfoFeatures: [
      "Supports SD, microSD, and CF memory cards",
      "USB 3.0 and USB-C connectivity for fast transfers",
      "Transfers large 4K/8K video and photos in seconds",
      "Compact, lightweight, and portable design",
      "Rugged, durable, and built for on-the-go use",
    ],
    additionalInfoHighlight: [
      "Data transfer speed: Up to 500MB/s",
      "Compatible with Windows and macOS",
      "Plug-and-play functionality, no drivers required",
    ],
  },
  {
    id: "product13",
    img: Printer,
    header: "HP LaserJet Pro MFP M428fdw Wireless Printer",
    price: "₹25,499",
    subdescription:
      "Wireless monochrome laser printer with scanning, copying, and faxing capabilities, perfect for small businesses and home offices.",
    reviewCount: "(350)",
    description1:
      "The HP LaserJet Pro MFP M428fdw is an all-in-one monochrome laser printer that supports wireless printing, scanning, copying, and faxing. Designed for small businesses and home offices, this printer offers fast printing speeds of up to 40 pages per minute, ensuring high productivity. The printer's compact design allows it to fit easily into any office setup, while the robust build ensures reliability for heavy use.",
    description2:
      "Equipped with advanced security features, the M428fdw protects sensitive documents with features like secure printing and PIN protection. The printer also supports mobile printing via Apple AirPrint, Google Cloud Print, and the HP Smart app, allowing you to print documents from smartphones and tablets. The easy-to-use touchscreen control panel enhances productivity and simplifies operation.",
    additionalInfoFeatures: [
      "Print, scan, copy, and fax capabilities",
      "Wireless and mobile printing support",
      "Fast printing speed up to 40 ppm",
      "Advanced security features for document protection",
      "Automatic duplex printing for efficiency",
    ],
    additionalInfoHighlight: [
      "Connectivity: Wi-Fi, Ethernet, USB 2.0",
      "Print Resolution: 1200 x 1200 dpi",
      "Monthly Duty Cycle: Up to 30,000 pages",
      "Paper Capacity: 250-sheet input tray",
    ],
  },
  {
    id: "product14",
    img: Projector,
    header: "Epson EF-100 Smart Portable Projector",
    price: "₹74,999",
    subdescription:
      "Portable mini-laser projector with smart connectivity, ideal for home theater and business presentations.",
    reviewCount: "(110)",
    description1:
      "The Epson EF-100 is a compact and portable mini-laser projector that delivers high-quality, bright projections in Full HD (1080p). With a 2000-lumen brightness rating, this projector is ideal for both home theater setups and business presentations. The built-in Android TV interface provides access to a wide range of streaming apps, such as Netflix, YouTube, and Hulu, without the need for a separate streaming device.",
    description2:
      "The EF-100 is equipped with wireless connectivity, allowing you to stream content from your smartphone, tablet, or laptop with ease. It also supports both Bluetooth and Wi-Fi, enabling connection to wireless speakers for enhanced audio. The ultra-portable design makes it easy to carry and set up anywhere, while the long-lasting laser light source ensures durability for years of use.",
    additionalInfoFeatures: [
      "2000-lumen brightness for vibrant, crisp projections",
      "Full HD 1080p resolution for sharp images",
      "Built-in Android TV for streaming apps",
      "Wireless and Bluetooth connectivity",
      "Long-lasting laser light source (up to 20,000 hours)",
    ],
    additionalInfoHighlight: [
      "Portable design for easy setup in any room",
      "Supports HDMI, USB, and wireless connections",
      "Perfect for home theater or business presentations",
      "Keystone correction for perfect image alignment",
    ],
  },
];

const CategoryProductsData = [
  {
    img: Mobile,
    product: "Smartphones",
  },
  {
    img: Laptop,
    product: "Laptops",
  },
  {
    img: Speaker1,
    product: "Speakers",
  },
  {
    img: Appliances,
    product: "Home Appliances",
  },
  {
    img: Laptop,
    product: "Gaming Laptops",
  },
  {
    img: Appliances,
    product: "Kitchen Appliances",
  },
  {
    img: Speaker1,
    product: "Bluetooth Speakers",
  },
  {
    img: Mobile,
    product: "Mobile Accessories",
  },
];


export { FeatureProductsData, CategoryProductsData };
