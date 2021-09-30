import { Modal, Image, Button } from 'semantic-ui-react'
import { useState } from 'react'

function TestModal({ photo }) {
    const [open, setOpen] = useState(false)
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <img className='photoMap' src={photo.img_url} alt='photo' />
            }
        >
            <Modal.Header>{photo.caption}</Modal.Header>
            <Modal.Content image>
                <Image size='big' src={photo.img_url} />

            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default TestModal