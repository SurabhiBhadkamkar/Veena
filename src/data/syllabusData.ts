import { CourseType, SemesterType } from '../types/user';

export interface Subject {
  code: string;
  name: string;
  credits: number;
  topics: string[];
}

export const SYLLABUS_DATABASE: Record<CourseType, Record<SemesterType, Subject[]>> = {
  'Computer Engineering': {
    '1st semester': [
      {
        code: 'CS101',
        name: 'Basic Mathematics',
        credits: 4,
        topics: ['Differential Calculus', 'Matrices & Determinants', 'Integral Calculus', 'Trigonometry Applications'],
      },
      {
        code: 'CS102',
        name: 'Fundamentals of ICT',
        credits: 3,
        topics: ['Computer Architecture basics', 'Operating Systems overview', 'Networking basics', 'Office productivity tools'],
      },
      {
        code: 'CS103',
        name: 'Engineering Graphics',
        credits: 3,
        topics: ['Orthographic projections', 'Isometric views', 'CAD tools fundamentals', 'Dimensioning techniques'],
      },
    ],
    '2nd semester': [
      {
        code: 'CS201',
        name: 'Applied Mathematics',
        credits: 4,
        topics: ['Differential Equations', 'Numerical Methods', 'Probability distributions', 'Complex variables'],
      },
      {
        code: 'CS202',
        name: 'Programming in C',
        credits: 4,
        topics: ['Data types & Operators', 'Control structures', 'Functions & Recursion', 'Pointers and Dynamic memory'],
      },
      {
        code: 'CS203',
        name: 'Basic Electronics',
        credits: 3,
        topics: ['Semiconductor diodes', 'BJT & FET transistors', 'Operational Amplifiers', 'Logic Gates'],
      },
    ],
    '3rd semester': [
      {
        code: 'CS301',
        name: 'Data Structures using C',
        credits: 4,
        topics: ['Arrays & Stacks', 'Queues & Circular queues', 'Linked Lists (Singly/Doubly)', 'Trees & Binary Search', 'Sorting & Searching algorithms'],
      },
      {
        code: 'CS302',
        name: 'Database Management Systems',
        credits: 4,
        topics: ['Relational Model & ER Diagrams', 'SQL Queries & Joins', 'Normalization (1NF-BCNF)', 'Transaction Management & Deadlocks'],
      },
      {
        code: 'CS303',
        name: 'Digital Techniques',
        credits: 3,
        topics: ['Boolean Algebra & K-Maps', 'Combinational circuits (Multiplexers)', 'Flip Flops & Counters', 'Shift Registers'],
      },
    ],
    '4th semester': [
      {
        code: 'CS401',
        name: 'Operating Systems',
        credits: 4,
        topics: ['Process Management & Scheduling', 'Thread synchronization & Semaphores', 'Deadlock Coffman Conditions', 'Virtual Memory & Paging'],
      },
      {
        code: 'CS402',
        name: 'Object Oriented Programming (Java)',
        credits: 4,
        topics: ['Classes & Inheritance', 'Polymorphism & Interfaces', 'Exception Handling', 'Multithreading & Collections'],
      },
      {
        code: 'CS403',
        name: 'Computer Networks',
        credits: 4,
        topics: ['OSI & TCP/IP Reference Models', 'IP Addressing & Subnetting', 'Routing protocols (OSPF, RIP)', 'Transport layer (TCP vs UDP)'],
      },
    ],
    '5th semester': [
      {
        code: 'CS501',
        name: 'Software Engineering',
        credits: 3,
        topics: ['Agile & Scrum methodology', 'Requirement engineering & UML', 'Software testing & QA', 'DevOps fundamentals'],
      },
      {
        code: 'CS502',
        name: 'Advanced Java Programming',
        credits: 4,
        topics: ['Swing & AWT GUI', 'JDBC Database connectivity', 'Servlets & JSP', 'Spring Boot fundamentals'],
      },
      {
        code: 'CS503',
        name: 'Client-Side Scripting (JavaScript)',
        credits: 3,
        topics: ['ES6+ features & Async/Await', 'DOM manipulation', 'React & component architecture', 'REST API consumption'],
      },
    ],
    '6th semester': [
      {
        code: 'CS601',
        name: 'Network & Information Security',
        credits: 4,
        topics: ['Cryptography (AES, RSA, ECC)', 'Digital signatures & PKI', 'Firewalls & IDS/IPS', 'Ethical Hacking basics'],
      },
      {
        code: 'CS602',
        name: 'Cloud Computing & AI',
        credits: 4,
        topics: ['Virtualization & Containers (Docker)', 'AWS/GCP core services', 'Machine Learning fundamentals', 'Generative AI applications'],
      },
      {
        code: 'CS603',
        name: 'Capstone Project & Seminar',
        credits: 6,
        topics: ['System design & Architecture', 'Full-stack development', 'Deployment & CI/CD', 'Project Documentation'],
      },
    ],
  },
  'Information Technology': {
    '1st semester': [
      {
        code: 'IT101',
        name: 'Basic Mathematics',
        credits: 4,
        topics: ['Algebra & Matrices', 'Trigonometry', 'Calculus fundamentals', 'Coordinate geometry'],
      },
      {
        code: 'IT102',
        name: 'Computer System Organisation',
        credits: 3,
        topics: ['CPU architecture', 'Memory hierarchy', 'I/O interfaces', 'Assembly language introduction'],
      },
    ],
    '2nd semester': [
      {
        code: 'IT201',
        name: 'Web Technology Essentials',
        credits: 4,
        topics: ['HTML5 semantic markup', 'CSS3 Flexbox & Grid', 'Responsive design', 'CSS preprocessors'],
      },
      {
        code: 'IT202',
        name: 'Programming with Python',
        credits: 4,
        topics: ['Python syntax & Data types', 'Functions & Modules', 'File I/O operations', 'Libraries (NumPy, Pandas)'],
      },
    ],
    '3rd semester': [
      {
        code: 'IT301',
        name: 'Data Structures and Algorithms',
        credits: 4,
        topics: ['Abstract Data Types', 'Stacks & Queues', 'Hash Tables', 'Graph algorithms (BFS/DFS)'],
      },
      {
        code: 'IT302',
        name: 'Relational Database Systems',
        credits: 4,
        topics: ['Schema design & normalization', 'PostgreSQL / MySQL queries', 'Triggers & Stored procedures', 'Transactions'],
      },
    ],
    '4th semester': [
      {
        code: 'IT401',
        name: 'Full Stack Web Development',
        credits: 4,
        topics: ['Node.js & Express servers', 'REST API design', 'Frontend state management', 'MongoDB / NoSQL databases'],
      },
      {
        code: 'IT402',
        name: 'Data Communication & Networks',
        credits: 4,
        topics: ['Transmission media', 'MAC Protocols', 'IP Subnetting & CIDR', 'Network Security basics'],
      },
    ],
    '5th semester': [
      {
        code: 'IT501',
        name: 'Information Security',
        credits: 4,
        topics: ['Cyber threats & Malware', 'Symmetric & Asymmetric Encryption', 'Web app vulnerabilities (OWASP)', 'Incident response'],
      },
      {
        code: 'IT502',
        name: 'Mobile Application Development',
        credits: 4,
        topics: ['React Native / Android SDK', 'UI Components & Navigation', 'API Integration', 'App store publishing'],
      },
    ],
    '6th semester': [
      {
        code: 'IT601',
        name: 'DevOps & Cloud Engineering',
        credits: 4,
        topics: ['Git workflows & GitHub Actions', 'Containerization (Docker)', 'Kubernetes basics', 'Cloud hosting (AWS/GCP)'],
      },
      {
        code: 'IT602',
        name: 'Data Science & Analytics',
        credits: 4,
        topics: ['Exploratory Data Analysis', 'Statistical modeling', 'Data visualization (Matplotlib, Seaborn)', 'Intro to ML models'],
      },
    ],
  },
  'Electronics Engineering': {
    '1st semester': [
      {
        code: 'EC101',
        name: 'Engineering Mathematics I',
        credits: 4,
        topics: ['Calculus & Differential equations', 'Complex numbers', 'Matrix theory', 'Vector calculus'],
      },
      {
        code: 'EC102',
        name: 'Basic Electrical Engineering',
        credits: 4,
        topics: ['Kirchhoff’s laws (KVL/KCL)', 'AC Circuits analysis', 'Transformers & Induction motors', 'Earthing & Safety'],
      },
    ],
    '2nd semester': [
      {
        code: 'EC201',
        name: 'Electronic Devices & Circuits',
        credits: 4,
        topics: ['PN Junction diodes & Zener diodes', 'Bipolar Junction Transistors (BJT)', 'FET & MOSFET biasing', 'Rectifiers & Filter circuits'],
      },
      {
        code: 'EC202',
        name: 'Network Analysis',
        credits: 4,
        topics: ['Thevenin & Norton Theorems', 'Maximum Power Transfer theorem', 'Transient response (RL, RC, RLC)', 'Two-port network parameters'],
      },
    ],
    '3rd semester': [
      {
        code: 'EC301',
        name: 'Digital Electronics',
        credits: 4,
        topics: ['Logic families (TTL, CMOS)', 'Combinational & Sequential logic', 'Counters, Registers & Memory', 'Verilog HDL basics'],
      },
      {
        code: 'EC302',
        name: 'Linear Integrated Circuits',
        credits: 4,
        topics: ['Op-Amp 741 characteristics', 'Inverting & Non-inverting amplifiers', 'Active filters & Oscillators', '555 Timer IC & applications'],
      },
    ],
    '4th semester': [
      {
        code: 'EC401',
        name: 'Signals and Systems',
        credits: 4,
        topics: ['Continuous vs Discrete signals', 'LTI systems & Convolution', 'Fourier Transform & Laplace Transform', 'Z-Transform fundamentals'],
      },
      {
        code: 'EC402',
        name: 'Microcontrollers & Embedded Systems',
        credits: 4,
        topics: ['8051 & ARM Cortex architecture', 'Assembly & Embedded C programming', 'Timers, Interrupts & Serial communication', 'Interfacing Sensors, LCDs, Motors'],
      },
    ],
    '5th semester': [
      {
        code: 'EC501',
        name: 'Communication Systems',
        credits: 4,
        topics: ['AM, FM, PM Modulation & Demodulation', 'Pulse Code Modulation (PCM)', 'Digital modulation (ASK, FSK, PSK)', 'Antennas & Wave propagation'],
      },
      {
        code: 'EC502',
        name: 'VLSI Design',
        credits: 4,
        topics: ['MOS Transistor theory & CMOS inverters', 'Stick diagrams & Layout design rules', 'Combinational logic in CMOS', 'FPGA prototyping & synthesis'],
      },
    ],
    '6th semester': [
      {
        code: 'EC601',
        name: 'IoT & Wireless Sensor Networks',
        credits: 4,
        topics: ['IoT architecture & Protocols (MQTT, CoAP)', 'ESP32 & Raspberry Pi programming', 'Cloud platforms for IoT', 'Wireless sensor nodes'],
      },
      {
        code: 'EC602',
        name: 'Power Electronics',
        credits: 4,
        topics: ['SCR, TRIAC, IGBT switching', 'Phase controlled rectifiers', 'Inverters & DC-DC Choppers', 'SMPS & UPS circuits'],
      },
    ],
  },
};
