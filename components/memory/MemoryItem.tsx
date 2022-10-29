import { Container, Space, Stack } from "@mantine/core"
import { Memory } from "@prisma/client"
import Flex from "components/glue/Flex"
import Input from "components/glue/Input"
import Textarea from "components/glue/Textarea"
import useIsDevice from "hooks/glue/useIsDevice"
import useMemories from "hooks/queries/useMemories"
import api from "lib/glue/api"
import React from "react"

interface IMemoryItemProps {
  memory: Memory
}

const MemoryItem = ({ memory }: IMemoryItemProps) => {
  const { update } = useMemories({
    isAuthed: true,
  })
  const { isMobile } = useIsDevice()

  const handleChange = (event) => {
    update("update-item", {
      id: memory?.id,
      title: event?.target?.value,
    })
  }

  const handleDebouncedChange = (value: string) => {
    api.put(`/glue/memory/${memory?.id}`, {
      title: value,
    })
  }

  const handleLocationChange = (event) => {
    update("update-item", {
      id: memory?.id,
      location: event?.target?.value,
    })
  }

  const handleDebouncedLocationChange = (value: string) => {
    api.put(`/glue/memory/${memory?.id}`, {
      location: value,
    })
  }

  const handleContentChange = (event) => {
    update("update-item", {
      id: memory?.id,
      content: event?.target?.value,
    })
  }

  const handleDebouncedContentChange = (value: string) => {
    api.put(`/glue/memory/${memory?.id}`, {
      content: value,
    })
  }

  return (
    <Stack>
      <Flex justify="space-between" align="flex-end" noWrap={true}>
        <Input
          value={memory?.title}
          onChange={handleChange}
          onDebouncedChange={handleDebouncedChange}
          variant="subtle"
          size="xl"
          sx={(theme) => ({
            flexGrow: 3,
            input: {
              fontWeight: 600,
              padding: ".5rem .2rem",
            },
          })}
        />
        <Input
          value={memory?.location}
          onChange={handleLocationChange}
          onDebouncedChange={handleDebouncedLocationChange}
          variant="subtle"
          sx={(theme) => ({
            minWidth: !isMobile && "200px",

            input: {
              fontWeight: 600,
              letterSpacing: ".02rem",
            },
          })}
        />
      </Flex>
      <Textarea
        value={memory?.content}
        variant="subtle"
        onChange={handleContentChange}
        onDebouncedChange={handleDebouncedContentChange}
        minRows={3}
        autosize={true}
      />
    </Stack>
  )
}

export default React.memo(MemoryItem)
