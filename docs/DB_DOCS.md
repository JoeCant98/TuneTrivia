# TuneTrivia Database Documentation

## Database: SQLite. Future Redis Implementation to speed up db processes.

TuneTrivia utilizes SQLite, a serverless, self-contained database engine known for its portability and simplicity.

## Tables

### Users

- **UserID (Primary Key)**
- Username
- Email
- Password (Hashed)

### GameSessions

- **SessionID (Primary Key)**
- Date and Time
- HostUserID (Foreign Key to Users Table)

### Scores

- **ScoreID (Primary Key)**
- SessionID (Foreign Key to GameSessions Table)
- UserID (Foreign Key to Users Table)
- Score

## Information to be Stored

1. **User Information:**
   - Username
   - Email
   - Password (Hashed)

2. **Game Sessions:**
   - Date and Time
   - Host User ID

3. **Scores:**
   - Score
   - Song, Album, or Artist details (if relevant)
   - Session details

## Usage Guidelines

- **Portability:**
  - The SQLite database file can be easily shared among different devices.

- **Backup:**
  - Regularly backup the database file to prevent data loss.

- **User Authentication:**
  - Implement secure user authentication practices.

- **Scoring and Leaderboards:**
  - Utilize the Scores table to calculate scores, generate leaderboards, and provide an engaging user experience.

- **Historical Data:**
  - Leverage the GameSessions and Scores tables to provide users with a historical view of their scores.

## Contributing

If you have suggestions or improvements for the database structure, feel free to contribute! Create a pull request or open an issue in the [TuneTrivia GitHub repository](https://github.com/your-username/tunetrivia).

## License

This documentation is licensed under the [MIT License](LICENSE.md).
