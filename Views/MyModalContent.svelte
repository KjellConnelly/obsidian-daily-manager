<script lang='ts'>
    import * as chrono from 'chrono-node'
    import getDailyNoteSettings from './../Functions/getDailyNoteSettings'
    import { RRule } from 'rrule'
    //import { onMount } from 'svelte';

    const styles = {
      section: "margin-bottom:8px",
    }


    let descriptionInput = undefined
    export let todo = {
      description: "",
      recurrenceRule:"",
      recurrenceEndDate:"",
      dateDue:"",
      dateDone:"",
      parsedDate:"",
      parsedTime:"",
    }
    let parsedDueDate = ""
    let parsedDueDateWithTime = ""
    let parsedRRule = ""
    let parsedDone = ""
    let parsedRecurrenceEndDate = ""

    function checkIfDisabled() {
      const isDisabled = !(todo.description.length > 0 && todo.parsedDate != undefined)
      console.log(isDisabled)
      return isDisabled
    }

    function onSubmit(e) {
      e.preventDefault()
      console.log(JSON.stringify(todo,null,2))

    }

    $: {
      if (!todo.dueDate) {
        parsedDueDate = '<i>no due date</>'
      } else {
        const parsed = chrono.parseDate(todo.dueDate, new Date(), { forwardDate: true });

        const parsed2 = chrono.parse(todo.dueDate, { forwardDate: true })
        let dateOnly = undefined
        let dateOnly_formatted = undefined
        let dateWithTime = undefined
        let timeFormatted = undefined
        todo.parsedDate = undefined
        todo.parsedTime = undefined

        const dailyNoteSettings = getDailyNoteSettings()

        if (parsed2.length > 0) {
          const {knownValues, impliedValues} = parsed2[0]?.start
          let day = knownValues.day || impliedValues.day
          let month = knownValues.month || impliedValues.month
          let year = knownValues.year || impliedValues.year
          let {hour, minute} = knownValues

          dateOnly = window.moment(new Date(year, month-1, day))

          if (hour != undefined || minute != undefined) {
            dateWithTime = dateOnly.clone()
            if (hour == undefined) { hour = impliedValues.hour }
            if (minute == undefined) { minute = impliedValues.minute }
            dateWithTime.set({'hour':hour, 'minute':minute})
            timeFormatted = dateWithTime.format("h:mma")
            todo.parsedTime = timeFormatted
          }
        }

        if (parsed !== null) {
          parsedDueDate = window.moment(parsed).format(dailyNoteSettings.format)
          todo.parsedDate = parsedDueDate
          if (timeFormatted != undefined) {
            parsedDueDate += ` @ ${timeFormatted}`
          }
        } else {
          parsedDueDate = '<i>invalid due date</i>'
        }
      }
    }
    $: {
      if (!todo.recurrenceRule) {
        parsedRRule = '<i>not recurring</>'
      } else {
        try {
          parsedRRule = RRule.fromText(todo.recurrenceRule).toText()
        } catch {
          parsedRRule = '<i>invalid recurrence rule</i>'
        }
      }
    }
    $: {
      if (!todo.recurrenceEndDate) {
        parsedRecurrenceEndDate = '<i>never</>'
      } else {
        try {
          const tempParsed = chrono.parseDate(todo.recurrenceEndDate, new Date(), { forwardDate: true });
          const dailyNoteSettings = getDailyNoteSettings()
          parsedRecurrenceEndDate = window.moment(tempParsed).format(dailyNoteSettings.format)
        } catch {
          parsedRecurrenceEndDate = '<i>invalid end date</i>'
        }
      }
    }

</script>


<div class="tasks-modal">
  <form on:submit={onSubmit}>

    <div class="tasks-modal-section" style={styles.section}>
      <label for="description">Description</label>
      <input bind:value={todo.description} bind:this={descriptionInput} id="description" type="text" class="tasks-modal-description" placeholder="Take out the trash" />
    </div>
    <div class="tasks-modal-section" style={styles.section}>
      <label for="due">Due</label>
      <input bind:value={todo.dueDate} id="due" type="text" placeholder="Try 'Monday' or 'tomorrow'." />
      <code>📅 {@html parsedDueDate}</code>
    </div>
    <div class="tasks-modal-section" style={styles.section}>
      <label for="recurrence">Recurrence</label>
      <input bind:value={todo.recurrenceRule} id="description" type="text" placeholder="Try 'every 2 weeks on Thursday'." />
      <code>🔁 {@html parsedRRule }</code>
    </div>
    <div class="tasks-modal-section" style={styles.section}>
      <label for="recurrenceEndDate">Recurrence End Date (Last Valid Date)</label>
      <input bind:value={todo.recurrenceEndDate} id="recurrenceEndDate" type="text" placeholder="Leave blank for never" />
      <code>📅 {@html parsedRecurrenceEndDate}</code>
    </div>
    <hr />
    <div class="tasks-modal-section">
      <div>
        Status:
        <input type="checkbox" class="task-list-item-checkbox tasks-modal-checkbox" checked={todo.dateDone.length > 0} disabled />
        <code>{todo.dateDone.length > 0 ? "Complete" : "Incomplete"}</code>
      </div>
      <div>
        Done on:
        <code>{@html parsedDone}</code>
      </div>
    </div>
    <div class="tasks-modal-section" />
    <div class="tasks-modal-section" style="float:right;">
      <button type="submit" class="mod-cta">Apply</button>
    </div>
  </form>
</div>
