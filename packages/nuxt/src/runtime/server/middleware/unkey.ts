import { defineEventHandler, getRequestHeader, useRuntimeConfig } from '#imports'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const key = getRequestHeader(event, 'authorization')?.split(config.unkey?.authPrefix ?? 'Bearer')[1]?.trim()
  if (!key) { return }

  // TODO: refactor to SDK once it is released
  event.context.unkey = await $fetch('https://api.unkey.dev/v1/keys/verify', {
    method: 'POST',
    body: { key }
  })
  // When `useUnkey` can taken an undefined token we can safely use the belowa
  // event.context.unkey = await useUnkey().keys.verify({ key })
})