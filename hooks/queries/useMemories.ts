import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseMemoriesArgs {
  isAuthed: boolean
}

export const queryConfigMemories = ({
  isAuthed,
}: IUseMemoriesArgs): IGlueQueryConfig => ({
  url: "/glue/memory",
  args: {
    orderBy: {
      createdAt: "desc",
    },
  },
  disabled: !isAuthed,
})

const useMemories = ({ isAuthed }: IUseMemoriesArgs) => {
  return useGlueQuery(
    queryConfigMemories({
      isAuthed,
    })
  )
}

export default useMemories
