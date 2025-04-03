Replyke - React Commenting System
=================================

Welcome to Replyke, a robust and customizable commenting system designed specifically for React applications. Replyke offers a seamless way to integrate a dynamic comment section into your website, enhancing user engagement and interaction.

Features
--------

-   Seamless Integration: Easily add a comment section to your React.js application.
-   Customizable UI: Tailor the look and feel of your comment section to match your website's style.
-   Privacy-Focused: Replyke operates entirely within your application's infrastructure, ensuring user data privacy.
-   Versatile Backend Compatibility: Compatible with various backend setups, adaptable to your preferred technology stack.
-   Advanced Styling Options: Use Replyke's Design Studio for easy UI customization or apply inline styling for nuanced control.

Getting Started
---------------

### Installation

Install Replyke via npm:

`npm install replyke`

### Basic Usage

Integrate the Replyke comment section into your React application with ease:


```
import { CommentSection } from 'replyke';

function App() {
  return (
    <div className="App">
      <CommentSection
        entityId="UNIQUE_ARTICLE_ID"
        styleId="YOUR_STYLE_ID"
        callbacks={{
          loginClickCallback: LOGIN_CALLBACK,
        }}
        // Additional configurations...
      />
    </div>
  );
}
``````

Documentation
-------------

For detailed instructions on how to integrate and use Replyke, including setting up API routes and customizing the user interface, please visit our comprehensive documentation at [Replyke Documentation](https://replyke.com/).

Note
----

Replyke is not open source, and as such, there isn't a public GitHub repository for contributions or support. For any inquiries or direct support, please refer to the contact details provided on our [website](https://replyke.com/).


## License
Replyke is provided under a proprietary license. The library is free to use in your applications, but redistribution or modification of the source code is not permitted. Some features of Replyke may be premium and subject to separate terms and conditions. Please refer to our [Terms of Service](https://replyke.com/terms) for more details.
