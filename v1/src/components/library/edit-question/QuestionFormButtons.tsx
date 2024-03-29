import { useState } from 'react'
import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'
import { Button } from '../../common/forms'
import { DeleteQuestionConfirmDialog } from './DeleteQuestionConfirmDialog'

type Props = {
  onSave: () => void
  onSaveAsNew: () => void
  onDelete: () => void
  editing: boolean
}

export function QuestionFormButtons({
  onSave,
  onSaveAsNew,
  onDelete,
  editing,
}: Props) {
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)

  return (
    <ButtonWrapper>
      <Button type="submit" onClick={onSave} grouped={editing}>
        Save
      </Button>
      {editing && (
        <>
          <DropdownMenu>
            <DropdownButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{
                  height: 20,
                  width: 20,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </DropdownButton>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                $danger
                onSelect={() => setShowConfirmDeleteDialog(true)}
              >
                Delete
              </DropdownMenu.Item>
              <DropdownMenu.Separator></DropdownMenu.Separator>
              <DropdownMenu.Item onSelect={onSaveAsNew}>
                Save as new
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
          <DeleteQuestionConfirmDialog
            open={showConfirmDeleteDialog}
            onOpenChange={setShowConfirmDeleteDialog}
            onConfirm={onDelete}
          ></DeleteQuestionConfirmDialog>
        </>
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

const DropdownButton = styled(DropdownMenu.Trigger)`
  background-color: ${({ theme }) => theme.colors.primary3};
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.primary4};
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary11};
  cursor: pointer;
  transition: background-color 0.15s;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary4};
  }
`
