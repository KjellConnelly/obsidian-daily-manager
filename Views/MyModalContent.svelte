<script lang='ts'>
    import * as chrono from 'chrono-node'
    import { RRule } from 'rrule'
    //import { onMount } from 'svelte';

    let descriptionInput = undefined
    let todo = {
      title: "",
      recurrenceRule:"",
      dateDue:"",
      dateDone:"",
    }
    let parsedDueDate = ""
    let parsedRRule = ""
    let parsedDone = ""

    function onSubmit() {
      alert(JSON.stringify(todo,null,2))
      console.log("onSubmit")
    }

    $: {
        if (!todo.dueDate) {
            parsedDueDate = '<i>no due date</>'
        } else {
          const parsed = chrono.parseDate(todo.dueDate, new Date(), { forwardDate: true });
          if (parsed !== null) {
            const dailyNoteSettings = getDailyNoteSettings()
            parsedDueDate = window.moment(parsed).format(dailyNoteSettings.format);
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
            parsedRRule = RRule.fromText(todo.recurrenceRule).toText();
          } catch {
            parsedRRule = '<i>invalid recurrence rule</i>'
          }
        }
    }


    function getDailyNoteSettings() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { internalPlugins, plugins } = window.app
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {}
        return {
          format: format || "YYYY-MM-DD",
          folder: folder?.trim() || "",
          template: template?.trim() || "",
        }
      } catch (err) {
        console.info("No custom daily note settings found!", err);
      }
    }

</script>


<div class="tasks-modal">
  <form on:submit={onSubmit}>
      <div class="tasks-modal-section">
        <label for="description">Description</label>
        <input bind:value={todo.description} bind:this={descriptionInput} id="description" type="text" class="tasks-modal-description" placeholder="Take out the trash" />
      </div>
      <hr />
      <div class="tasks-modal-section">
        <label for="due">Due</label>
        <input bind:value={todo.dueDate} id="due" type="text" placeholder="Try 'Monday' or 'tomorrow'." />
        <code>📅 {@html parsedDueDate}</code>
      </div>
      <hr />
      <div class="tasks-modal-section">
        <label for="recurrence">Recurrence</label>
        <input bind:value={todo.recurrenceRule} id="description" type="text" placeholder="Try 'every 2 weeks on Thursday'." />
        <code>🔁 {@html parsedRRule }</code>
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
      <hr />
      <div class="tasks-modal-section" />
      <div class="tasks-modal-section">
        <button type="submit" class="mod-cta">Apply</button>
      </div>
  </form>
</div>
