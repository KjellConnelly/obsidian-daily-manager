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
    console.info("No custom daily note settings found!", err)
  }
}

export default getDailyNoteSettings
