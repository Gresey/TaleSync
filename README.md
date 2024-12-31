

# **TaleSync**

**TaleSync** is a real-time collaborative journaling platform where users can create shared diary writing, upload and manage photos, set reminders, and interact with other members in the same room. Built using MERN stack, this application emphasizes shared experiences and multi-user collaboration.


## **Features**

### **Core Features**
1. **Shared Journaling**  
   - Real-time collaborative journaling for all members of a room.  
   - Rich text editor with options for media embedding.  

2. **Shared Photo Gallery**  
   - Upload, view, and manage shared photos in a dedicated folder.  
   - Add captions and tags to photos for better organization.  

3. **Shared Reminders**  
   - Set and receive reminders for collaborative tasks or journaling events.  
   - Notifications for upcoming or overdue reminders.  

4. **Multi-User Real-Time Updates**  
   - All changes (journals, photos, reminders) are instantly reflected for all users in the same room using WebSockets.

### **Additional Features**
- **Real-Time Emotional Heatmap**  
  Analyze journal entries for sentiment and display an overall emotional "heatmap" for the room.

- **Voice-to-Text Journaling**  
  Dictate your journal entries using voice input for a hands-free experience.

- **Customizable Themes**  
  Users can select themes for their journaling interface, making it more personal and enjoyable.

- **User Roles and Permissions**  
  - Admins: Can invite or remove members, and manage room settings.  
  - Members: Can contribute to journals, photos, and reminders.



## **Tech Stack**

### **Frontend**  
- **React.js**: For creating a responsive and dynamic user interface.  
- **Redux/Context API**: For state management across components.  


### **Backend**  
- **Node.js**: Server-side JavaScript runtime.  
- **Express.js**: Lightweight web application framework.  

### **Database**  
- **MongoDB**: NoSQL database for storing user, room, journal, photo, and reminder data.

### **Real-Time Updates**  
- **Socket.IO**: For real-time communication and updates between users in the same room.

### **Authentication**  
- **JWT (JSON Web Token)**: For secure user authentication and session management.  
- **BCrypt.js**: For password hashing.



## **Contributing**

To contribute:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/YourFeature`).  
3. Commit your changes (`git commit -m "Add YourFeature"`).  
4. Push to the branch (`git push origin feature/YourFeature`).  
5. Open a Pull Request.


