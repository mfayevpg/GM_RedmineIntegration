GM_RedmineIntegration
=====================

A GreaseMonkey Script to help with Redmine issue management

To make this work, you will first need to install the GreaseMonkey firefox plugin (did not test the chrome one).
Once you have it installed, 
Goto raw Change_redmine_status.user.js file from this repo
Select all and copy it
Click on the GreaseMonkey icon in Firefox and select "New user script"

The extension should detect that you have a script in your clipboard and automaticaly create what's needed on your side.

Now that the script is installed, you'll have to add the config file.
For obvious security reason they're not included in the GM script.
Retriev the redmine.config.js.dist file from this repo and put it in the following folder in your hard drive :
~/.mozilla/firefox/[some_random_value].default/gm_scripts/Change_redmine_status/
Edit it with your values and save it as redmine.config.js

This should do it.

If anyone knows how to make this installation less clumsy... He's welcome to share it :)
