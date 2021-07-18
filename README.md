# Obsidian Daily Manager

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
