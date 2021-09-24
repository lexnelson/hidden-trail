import {useState} from 'react'
import {Image, Form, Button} from 'semantic-ui-react'
//react-image-uploader
function Images(){
    const [imgSrc, setImgSrc]=useState({
        image: null
    })
    console.log(imgSrc)
    function handleChange(e){
        if (e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setImgSrc({
                image: URL.createObjectURL(img)
            })
        }
    }

    
    return(
        <div>
            {imgSrc ? <Image src={imgSrc.image} alt='img' size='small'/> : <> </>}
            <h1>Select an Image</h1>
            <Form>
                <Form.Field>
                {/* <Button
                content="Choose File"
                labelPosition="left"
                 icon="file"
                 onClick={triggerInput}
                // onClick={() => this.fileInputRef.current.click()}
                            /> */}
                <input  
                id='input'
                type="file"
               
                onChange={handleChange} />
                </Form.Field>
            </Form>
            
        </div>
    )
}

export default Images