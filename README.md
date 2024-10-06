# Subodh Notifier

## Overview

Subodh Notifier is an automated WhatsApp bot designed to provide the latest updates from SS Jain Subodh College to students via a WhatsApp channel. This project aims to make college information more accessible and convenient for students, ensuring they stay up-to-date with important announcements and news.

## Purpose

The primary goal of Subodh Notifier is to bridge the information gap between the college administration and students. By automating the process of fetching and distributing college updates, we ensure that students receive timely and accurate information directly on their preferred messaging platform - WhatsApp.

## Features

- Automated scraping of SS Jain Subodh College website for latest updates
- WhatsApp integration for message delivery to a dedicated channel
- PDF handling: downloads and converts PDFs to images for easy viewing
- Intelligent scheduling of messages with random delays to mimic human behavior
- Duplicate news detection to avoid spam
- Error handling and admin notifications for system health monitoring

## How It Works

1. Regularly scrapes the college website for new updates
2. Processes and filters the information to avoid duplicates
3. Converts any PDF attachments to easily viewable images
4. Sends updates to the "Subodh Notifier" WhatsApp channel
5. Employs smart scheduling to spread out messages naturally

## Technology Stack

- Node.js
- MongoDB for data storage
- WhatsApp Web API for message delivery
- Various npm packages for web scraping, PDF processing, and more

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/mrsandyy/subodh-notifier
   cd subodh-notifier
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the necessary configurations.

4. Start the bot:
   ```
   node app.js
   ```

## Configuration

Detailed configuration instructions can be found in the `config-example.env` file. Make sure to set up all required environment variables before running the bot.

## Usage

Once set up and running, the bot operates autonomously. Students can join the "Subodh Notifier" WhatsApp channel to receive updates. Administrators can monitor the bot's health through configured notification channels.

## Contributing

We welcome contributions to improve Subodh Notifier! If you have suggestions or want to contribute code, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## Authors

- **Sandeep Vishnoi** (@mrsandyy\_) - _Core Developer_
- **Dhairya Gupta** - _Core Contributor_

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- SS Jain Subodh College for being the inspiration behind this project
- All the students who use and provide feedback on Subodh Notifier
- The open-source community for the amazing tools and libraries that made this project possible

## Contact

For any queries, suggestions, or support, please contact:

- Sandeep Vishnoi - [@mrsandyy\_](https://www.instagram.com/mrsandyy_/)

Join the Subodh Notifier channel on WhatsApp to start receiving updates!
