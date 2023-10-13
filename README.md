# members-only

A basic webapp for practicing authentication as part of [The Odin Project's](https://www.theodinproject.com/) NodeJS course.

_This project was initially worked on during my first run of The Oding Project as seen in the [old](https://github.com/Ashish-Krishna-K/members-only/tree/old) branch here. During my second run, I"m revisiting previous projects and this time I decided to use TypeScript as a practice._

## Explanation

The project's aim is to practice authenticating users with [PassportJS](https://www.passportjs.org/) Library.

Everyone who visits the website is capable of viewing all the messages added by users. However to see who posted which message a user will first have to become a member.

If any user chooses to post a message of their own, the user will have to sign-up and login post which the user will be allowed to post a message.

To become a member, the user will have to provide a secret passphrase for which a hint is provided, if the secret passphrases matches, the user is made a member and will be able to view who posted which message and on which date.

Additionally, users will be able to become an Admin in a similar way by inputting a secret passphrase. However, no hint will be provided in this case.
An admin will have an additional option of deleting message.
