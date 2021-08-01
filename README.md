# Obsidian Daily Manager
This plugin is used to quickly add future todos.

## Using Once Installed

### 1: Setup within Obsidian
1. Open `Settings`
  a. Click `Options > Community Plugins` and make sure `Daily Manager` is enabled (toggled on).
  b. Click `Plugin Options > Daily Manager` to edit all your default options.

### 2: Using Commands
Open the `Command Palette` (CMD+P by default on macOS) and start typing in `Daily Manager`. You will see a list of commands.

#### Daily Manager: Insert Todo
This is the bread and butter of adding new todos.


## Formats

Based on your `Daily Notes` settings, your format will be displayed the same when you use this plugin. When you type in dates, we use `chrono-node` for parsing, which by default uses **international English**. If you want a different format, this plugin isn't configured to do that at the moment. If an ambiguous date is given, such as Tuesday (ie which Tuesday?), and you don't specify, it will find the next occurrence of this (next Tuesday).

**User Input Format Examples**

| User Input  | Using Words    | Parsed Output | Notes |
|-------------|----------------|---------------|-------|
| `6/5/2020`  | June 5th 2020  | 06/05/2020    |       |
| `6/20/2020` | June 20th 2020 | 06/20/2020    |       |
| `20/6/2020` | June 20th 2020 | 06/20/2020    |       |
| `20/6/20`   | June 20th 2020 | 06/20/2020    |       |
| `6/20/20`   | June 20th 2020 | 06/20/2020    |       |
| `20/6`      | June 20th 2020 | 06/20/2022    | When writing this, it's `July 18, 2021`. Since I didn't specify a year, and the next June (future) is in 2022, it pushes to next year.|
| `20/8`      | August 20th 2020 | 08/20/2021    | When writing this, it's `July 18, 2021`. Since I didn't specify a year, and the next August (future) is in 2021, it Uses the current year.|
| `every 5 weeks on monday and friday until 5/25/22` | N/A | every 5 weeks on Monday, Friday until May 25, 2022 | You can even write in somewhat complex English sentences. Especially useful for recurring events |
| `tomorrow at 6pm` |
