import { Container, Space, Stack } from "@mantine/core"
import AddIcon from "@mui/icons-material/Add"
import Button from "components/glue/Button"
import useMemories from "hooks/queries/useMemories"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import MemoryItem from "./MemoryItem"

const MemoryList = () => {
  const { status } = useSession()
  const { data: memories, update: updateMemory } = useMemories({
    isAuthed: status === "authenticated",
  })

  const handleAddMemory = async () => {
    const defaultMemory = {
      id: Math.floor(Math.random() * 10000),
      title: "",
      location: "",
      photo1: "",
      photo2: "",
      photo3: "",
      content: "",
    }
    updateMemory("append-start", defaultMemory)
    api.post("/glue/memory", defaultMemory)
  }

  return (
    <Container>
      {status === "authenticated" && (
        <Button leftIcon={<AddIcon />} onClick={handleAddMemory}>
          Add memory
        </Button>
      )}
      <Space mb="2rem" />
      <Stack>
        {memories?.map((memory) => (
          <MemoryItem key={memory?.id} memory={memory} />
        ))}
      </Stack>
    </Container>
  )
}

export default MemoryList
