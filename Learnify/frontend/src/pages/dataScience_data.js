// Data for the roadmap steps

// Beginner roadmap steps
const beginnerSteps = [
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    description: "Learn Python, the most popular language for data science. Focus on syntax, data structures, functions, and basic algorithms.",
    icon: "fas fa-code",
    skills: [
      "Python syntax and basic operations",
      "Data structures (lists, dictionaries, sets)",
      "Control flow and functions",
      "File handling and basic I/O"
    ],
    resources: [
      {
        id: "codecademy-python",
        title: "Codecademy: Learn Python",
        description: "Interactive Python course covering all the basics with hands-on exercises",
        type: "Course",
        url: "https://www.codecademy.com/learn/learn-python-3"
      },
      {
        id: "automate-boring-stuff",
        title: "Automate the Boring Stuff with Python",
        description: "Free e-book teaching practical Python programming for beginners",
        type: "Book",
        url: "https://automatetheboringstuff.com/"
      }
    ]
  },
  {
    id: "statistics-mathematics",
    title: "Statistics & Mathematics",
    description: "Understand fundamental statistical concepts and mathematical principles that form the core of data science.",
    icon: "fas fa-chart-pie",
    skills: [
      "Descriptive statistics (mean, median, variance)",
      "Probability distributions",
      "Hypothesis testing",
      "Linear algebra basics"
    ],
    resources: [
      {
        id: "khan-statistics",
        title: "Khan Academy: Statistics and Probability",
        description: "Video lessons with interactive exercises covering all essential concepts",
        type: "Course",
        url: "https://www.khanacademy.org/math/statistics-probability"
      },
      {
        id: "3blue1brown-linear-algebra",
        title: "3Blue1Brown: Essence of Linear Algebra",
        description: "Visual introduction to linear algebra concepts essential for data science",
        type: "Video",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
      }
    ]
  },
  {
    id: "data-manipulation-visualization",
    title: "Data Manipulation & Visualization",
    description: "Learn to clean, process, and visualize data using popular Python libraries like Pandas and Matplotlib.",
    icon: "fas fa-table",
    skills: [
      "Data cleaning and preprocessing",
      "Data manipulation with Pandas",
      "Data visualization with Matplotlib and Seaborn",
      "Basic exploratory data analysis (EDA)"
    ],
    resources: [
      {
        id: "pandas-docs",
        title: "Pandas Documentation: 10 Minutes to Pandas",
        description: "Quick intro tutorial to the most-used pandas functions",
        type: "Tutorial",
        url: "https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html"
      },
      {
        id: "kaggle-data-viz",
        title: "Kaggle: Data Visualization with Python",
        description: "Interactive notebooks teaching how to create insightful visualizations",
        type: "Notebook",
        url: "https://www.kaggle.com/learn/data-visualization"
      }
    ]
  },
  {
    id: "beginner-projects",
    title: "Beginner Projects",
    description: "Apply your new knowledge by working on simple data analysis projects to build confidence and experience.",
    icon: "fas fa-laptop-code",
    skillsTitle: "Project Ideas",
    skills: [
      "Exploratory data analysis on public datasets",
      "Data visualization dashboard",
      "Simple prediction tasks (e.g., predicting housing prices)",
      "Data cleaning and preprocessing case studies"
    ],
    resources: [
      {
        id: "kaggle-datasets",
        title: "Kaggle Datasets",
        description: "Large collection of free datasets to practice data analysis and visualization",
        type: "Dataset",
        url: "https://www.kaggle.com/datasets"
      },
      {
        id: "real-python-projects",
        title: "Real Python: Data Science Project Tutorials",
        description: "Step-by-step guides for building beginner-friendly data projects",
        type: "Tutorial",
        url: "https://realpython.com/tutorials/data-science/"
      }
    ]
  }
];

// Intermediate roadmap steps
const intermediateSteps = [
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Learn core machine learning algorithms and concepts, including supervised and unsupervised learning techniques.",
    icon: "fas fa-brain",
    skills: [
      "Regression and classification algorithms",
      "Model evaluation and validation",
      "Feature engineering and selection",
      "Introduction to scikit-learn library"
    ],
    resources: [
      {
        id: "stanford-ml",
        title: "Stanford CS229: Machine Learning",
        description: "Free lecture videos and course materials from Stanford University",
        type: "Course",
        url: "https://see.stanford.edu/Course/CS229"
      },
      {
        id: "intro-statistical-learning",
        title: "Introduction to Statistical Learning",
        description: "Free e-book covering machine learning concepts with R (concepts apply to Python)",
        type: "Book",
        url: "https://www.statlearning.com/"
      }
    ]
  },
  {
    id: "sql-database-skills",
    title: "SQL & Database Skills",
    description: "Master SQL for data extraction and manipulation, and understand database principles for efficient data handling.",
    icon: "fas fa-database",
    skills: [
      "SQL syntax and database queries",
      "Database design and normalization",
      "Integration of SQL with Python (SQLAlchemy)",
      "Working with relational databases like PostgreSQL"
    ],
    resources: [
      {
        id: "mode-analytics-sql",
        title: "Mode Analytics: SQL Tutorial",
        description: "Interactive SQL course for data analysts with real-world examples",
        type: "Course",
        url: "https://mode.com/sql-tutorial/"
      },
      {
        id: "sqlzoo",
        title: "SQLZoo",
        description: "Interactive SQL exercises to practice different SQL commands",
        type: "Practice",
        url: "https://sqlzoo.net/"
      }
    ]
  },
  {
    id: "data-engineering-basics",
    title: "Data Engineering Basics",
    description: "Learn how to build data pipelines, perform ETL operations, and work with big data technologies.",
    icon: "fas fa-cogs",
    skills: [
      "Data extraction, transformation, and loading (ETL)",
      "Data pipeline automation",
      "Introduction to big data concepts",
      "Version control and data documentation"
    ],
    resources: [
      {
        id: "towards-data-science-etl",
        title: "Towards Data Science: ETL Pipeline Guide",
        description: "Tutorial for building ETL pipelines in Python with practical examples",
        type: "Tutorial",
        url: "https://towardsdatascience.com/data-science-for-startups-data-pipelines-786f6746a59a"
      },
      {
        id: "dataquest-data-engineering",
        title: "Dataquest: Data Engineering for Data Scientists",
        description: "Free intro modules to data engineering concepts and tools",
        type: "Course",
        url: "https://www.dataquest.io/path/data-engineering/"
      }
    ]
  },
  {
    id: "intermediate-projects",
    title: "Intermediate Projects",
    description: "Build more complex data science projects that demonstrate your ability to solve real-world problems.",
    icon: "fas fa-project-diagram",
    skillsTitle: "Project Ideas",
    skills: [
      "Machine learning models for prediction tasks",
      "End-to-end data analysis pipeline",
      "Interactive data dashboards (Plotly, Dash)",
      "Recommender systems"
    ],
    resources: [
      {
        id: "practical-ml-projects",
        title: "Practical Machine Learning Projects",
        description: "Collection of intermediate machine learning projects with source code",
        type: "GitHub",
        url: "https://github.com/practical-tutorials/project-based-learning#machine-learning"
      },
      {
        id: "dash-tutorials",
        title: "Dash Documentation: Building Data Dashboards",
        description: "Tutorials on building interactive dashboards with Python",
        type: "Tutorial",
        url: "https://dash.plotly.com/tutorial"
      }
    ]
  }
];

// Advanced roadmap steps
const advancedSteps = [
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Learn neural network architectures and deep learning techniques using modern frameworks like TensorFlow and PyTorch.",
    icon: "fas fa-network-wired",
    skills: [
      "Neural network architectures (CNN, RNN, LSTM)",
      "TensorFlow and/or PyTorch frameworks",
      "Transfer learning and fine-tuning",
      "Neural network optimization techniques"
    ],
    resources: [
      {
        id: "fastai-deep-learning",
        title: "Fast.ai: Practical Deep Learning",
        description: "High-quality free course that takes a practical approach to deep learning",
        type: "Course",
        url: "https://course.fast.ai/"
      },
      {
        id: "deep-learning-book",
        title: "Deep Learning Book",
        description: "Comprehensive free online book by Ian Goodfellow and Yoshua Bengio",
        type: "Book",
        url: "https://www.deeplearningbook.org/"
      }
    ]
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing",
    description: "Master techniques for processing and analyzing text data, from basic text preprocessing to advanced language models.",
    icon: "fas fa-language",
    skills: [
      "Text preprocessing and tokenization",
      "Word embeddings (Word2Vec, GloVe)",
      "Language models (BERT, GPT)",
      "Text classification and sentiment analysis"
    ],
    resources: [
      {
        id: "huggingface-nlp",
        title: "Hugging Face: NLP Course",
        description: "Practical NLP course focusing on transformers and advanced models",
        type: "Tutorial",
        url: "https://huggingface.co/course"
      },
      {
        id: "nlp-progress",
        title: "NLP-progress Repository",
        description: "Tracking progress in Natural Language Processing with papers and code",
        type: "GitHub",
        url: "https://github.com/sebastianruder/NLP-progress"
      }
    ]
  },
  {
    id: "big-data-technologies",
    title: "Big Data Technologies",
    description: "Learn to work with distributed computing frameworks and big data tools for processing large-scale datasets.",
    icon: "fas fa-cloud",
    skills: [
      "Apache Spark and PySpark",
      "Hadoop ecosystem",
      "Distributed computing principles",
      "Cloud platforms (AWS, GCP, Azure) for data science"
    ],
    resources: [
      {
        id: "spark-docs",
        title: "Spark Documentation: Learning Spark",
        description: "Official Spark tutorial with PySpark examples",
        type: "Course",
        url: "https://spark.apache.org/docs/latest/quick-start.html"
      },
      {
        id: "aws-tutorials",
        title: "AWS Free Tier Tutorials",
        description: "Hands-on labs for big data processing on AWS",
        type: "Tutorial",
        url: "https://aws.amazon.com/getting-started/hands-on/?getting-started-all.sort-by=item.additionalFields.sortOrder&getting-started-all.sort-order=asc&awsf.getting-started-category=category%23analytics"
      }
    ]
  },
  {
    id: "advanced-projects",
    title: "Advanced Projects & Specialization",
    description: "Build complex, production-ready data science projects and specialize in areas that align with your interests and career goals.",
    icon: "fas fa-rocket",
    skillsTitle: "Project Ideas",
    skills: [
      "Building end-to-end ML pipelines and deployment",
      "Computer vision or NLP applications",
      "Time series forecasting for business metrics",
      "Kaggle competitions participation"
    ],
    resources: [
      {
        id: "kaggle-competitions",
        title: "Kaggle Competitions",
        description: "Participate in data science competitions to test and improve your skills",
        type: "Platform",
        url: "https://www.kaggle.com/competitions"
      },
      {
        id: "full-stack-deep-learning",
        title: "Full Stack Deep Learning",
        description: "Free course on building and deploying deep learning projects",
        type: "Tutorial",
        url: "https://fullstackdeeplearning.com/"
      }
    ]
  }
];

// Resources data
const resources = [
  {
    id: "resource-1",
    title: "Python for Data Science and Machine Learning Bootcamp",
    description: "Comprehensive course covering Python libraries, data visualization, and machine learning algorithms.",
    category: "Course",
    level: "Beginner",
    duration: "30+ hours",
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/"
  },
  {
    id: "resource-2",
    title: "Deep Learning by Ian Goodfellow",
    description: "Comprehensive free book covering neural network theory and applications from leading experts.",
    category: "Book",
    level: "Advanced",
    duration: "800 pages",
    url: "https://www.deeplearningbook.org/"
  },
  {
    id: "resource-3",
    title: "Pandas Data Manipulation Tutorial",
    description: "Step-by-step tutorial on using Pandas for effective data cleaning and transformation.",
    category: "Tutorial",
    level: "Intermediate",
    duration: "5 hours",
    url: "https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html"
  },
  {
    id: "resource-4",
    title: "Kaggle Notebooks",
    description: "Free cloud-based Jupyter environment to practice data science with free datasets.",
    category: "Tool",
    level: "All levels",
    duration: "Free access",
    url: "https://www.kaggle.com/notebooks"
  },
  {
    id: "resource-5",
    title: "Stanford CS229: Machine Learning",
    description: "Complete Stanford University course with lecture videos and materials covering ML theory.",
    category: "Course",
    level: "Intermediate",
    duration: "40+ hours",
    url: "https://see.stanford.edu/Course/CS229"
  },
  {
    id: "resource-6",
    title: "Scikit-learn Tutorial: ML in Python",
    description: "Hands-on tutorial series teaching ML implementation with scikit-learn library.",
    category: "Tutorial",
    level: "Intermediate",
    duration: "6 hours",
    url: "https://scikit-learn.org/stable/tutorial/index.html"
  },
  {
    id: "resource-7",
    title: "Hands-On Machine Learning with Scikit-Learn & TensorFlow",
    description: "Practical guide to implementing machine learning algorithms with real-world examples.",
    category: "Book",
    level: "Intermediate",
    duration: "600 pages",
    url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/"
  },
  {
    id: "resource-8",
    title: "Google Data Analytics Certificate",
    description: "Professional certificate program teaching foundational data skills across multiple tools.",
    category: "Course",
    level: "Beginner",
    duration: "80 hours",
    url: "https://grow.google/certificates/data-analytics/"
  },
  {
    id: "resource-9",
    title: "IBM Data Science Professional Certificate",
    description: "Comprehensive data science training from fundamentals to advanced ML techniques.",
    category: "Course",
    level: "Beginner to Intermediate",
    duration: "100+ hours",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science"
  },
  {
    id: "resource-10",
    title: "Fast.ai Deep Learning Course",
    description: "Practical approach to deep learning with PyTorch, focusing on coding over theory.",
    category: "Course",
    level: "Intermediate",
    duration: "40+ hours",
    url: "https://course.fast.ai/"
  },
  {
    id: "resource-11",
    title: "Elements of Statistical Learning",
    description: "Free comprehensive statistical learning textbook covering both concepts and applications.",
    category: "Book",
    level: "Advanced",
    duration: "750 pages",
    url: "https://web.stanford.edu/~hastie/ElemStatLearn/"
  },
  {
    id: "resource-12",
    title: "Jupyter Notebook",
    description: "Interactive computing environment for creating and sharing documents with live code.",
    category: "Tool",
    level: "All levels",
    duration: "Free access",
    url: "https://jupyter.org/"
  }
];

// Progress tracking items
const progressItems = {
  beginner: [
    'Programming Fundamentals',
    'Statistics & Mathematics',
    'Data Manipulation',
    'Beginner Projects'
  ],
  intermediate: [
    'Machine Learning Basics',
    'SQL & Database Skills',
    'Data Engineering Basics',
    'Intermediate Projects'
  ],
  advanced: [
    'Deep Learning',
    'Natural Language Processing',
    'Big Data Technologies',
    'Advanced Projects'
  ]
};