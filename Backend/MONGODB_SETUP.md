# MongoDB Setup Guide

Choose one method to set up MongoDB: Local installation or MongoDB Atlas (Cloud).

## Option 1: MongoDB Atlas (Cloud) - Recommended for Beginners

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google account
4. Verify your email

### Step 2: Create a Cluster
1. After signup, click "Create" on the homepage
2. Select "M0 Free" tier (free forever)
3. Choose your cloud provider (AWS, Google Cloud, Azure - any is fine)
4. Choose a region closest to you
5. Click "Create Cluster" (takes 2-3 minutes)

### Step 3: Create Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Fill in username: `admin`
4. Fill in password: Create a strong password (copy it!)
5. Select "Built-in Role" → "Atlas admin"
6. Click "Add User"

### Step 4: Whitelist Your IP
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow access from anywhere" (for development only)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" section
2. Click "Connect" on your cluster
3. Click "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Replace `<database>` with `travel-service`

Example:
```
mongodb+srv://admin:YourPassword123@cluster0.abcd.mongodb.net/travel-service
```

### Step 6: Update .env
```env
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.abcd.mongodb.net/travel-service
```

### Step 7: Done! ✅
Your backend can now connect to MongoDB Atlas.

---

## Option 2: Local MongoDB Installation

### For Windows

#### Method A: Installation
1. Download MongoDB Community from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Leave "Install MongoDB as a Service" checked
5. Click "Finish"
6. MongoDB starts automatically

#### Method B: Using Chocolatey (if installed)
```powershell
choco install mongodb-community
```

#### Verify Installation
```powershell
mongosh --version
```

#### Update .env
```env
MONGODB_URI=mongodb://localhost:27017/travel-service
```

---

### For macOS

#### Method A: Using Homebrew
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh --version
```

#### Method B: Download
1. Go to https://www.mongodb.com/try/download/community
2. Select macOS and your processor (Intel or Apple Silicon)
3. Download and open the .tgz file
4. Extract to Applications folder

#### Update .env
```env
MONGODB_URI=mongodb://localhost:27017/travel-service
```

---

### For Linux (Ubuntu/Debian)

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Verify
mongosh --version
```

#### Update .env
```env
MONGODB_URI=mongodb://localhost:27017/travel-service
```

---

## Testing MongoDB Connection

### Using mongosh (MongoDB Shell)

```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Create/use travel-service database
use travel-service

# Show collections
show collections

# Insert test data
db.users.insertOne({ name: "Test User", email: "test@test.com" })

# Query test data
db.users.find()

# Exit
exit
```

### Using your Backend

1. Make sure MongoDB is running
2. Update .env with MongoDB URI
3. Start backend: `npm run dev`
4. Should see: `MongoDB connected successfully`

---

## MongoDB Commands Reference

```bash
# Connect to MongoDB
mongosh

# Switch to database
use travel-service

# Show all collections
show collections

# View users
db.users.find()

# View services
db.services.find()

# View bookings
db.bookings.find()

# Count documents
db.users.countDocuments()

# Delete a collection
db.users.deleteMany({})

# Update a document
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { role: "admin" } }
)

# Create index
db.users.createIndex({ email: 1 })

# View database stats
db.stats()
```

---

## Troubleshooting

### "MongoServerError: connect ECONNREFUSED"
- MongoDB is not running
- Check if service is started: `sudo systemctl status mongod` (Linux) or `brew services list` (Mac)
- Restart: `sudo systemctl restart mongod` (Linux) or `brew services restart mongodb-community` (Mac)

### "Error: Authorization failed"
- MongoDB Atlas: Check username and password
- Check if user role includes database access
- Make sure IP is whitelisted

### "No connection string found"
- Update .env file with correct MongoDB URI
- Restart backend after updating .env

### "MongooseError: Cannot connect to MongoDB"
- Check if MONGODB_URI is correct
- For local: Use `mongodb://localhost:27017/travel-service`
- For Atlas: Use full connection string with password

### Port 27017 already in use
- Change port in MongoDB config or use different port
- Or kill process using port: `sudo lsof -i :27017`

---

## Which Method to Choose?

### Use MongoDB Atlas if:
- ✅ You want cloud database (accessible anywhere)
- ✅ You don't want to manage MongoDB locally
- ✅ You're deploying to production
- ✅ You want automatic backups
- ✅ Recommended for beginners

### Use Local MongoDB if:
- ✅ You're developing offline
- ✅ You want full control
- ✅ You don't want to share credentials
- ✅ You're familiar with MongoDB administration
- ✅ You need high performance locally

---

## Migrating Between Options

### Atlas to Local:
1. Export data from Atlas
2. Import to local MongoDB
3. Update MONGODB_URI in .env

### Local to Atlas:
1. Export data from local MongoDB
2. Import to MongoDB Atlas
3. Update MONGODB_URI in .env

---

## Backup and Restore

### Backup Local MongoDB
```bash
# Backup
mongodump --db travel-service -o ./backup

# Restore
mongorestore ./backup
```

### MongoDB Atlas Backups
- Automatic daily backups (free tier: 7-day retention)
- Manual snapshots available
- Full restore capability
- See Atlas console for details

---

## Performance Tips

1. **Create Indexes** for frequently queried fields
   ```bash
   db.users.createIndex({ email: 1 })
   db.bookings.createIndex({ userId: 1 })
   ```

2. **Monitor Connections**
   ```bash
   mongosh --eval "db.currentOp()"
   ```

3. **Check Database Size**
   ```bash
   mongosh
   use travel-service
   db.stats()
   ```

---

## Next Steps

1. Choose MongoDB setup (Atlas or Local)
2. Follow the steps for your choice
3. Update .env with connection string
4. Test connection with backend
5. See QUICKSTART.md to run backend

---

**You're all set with MongoDB! 🎉**
