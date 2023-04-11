import { InputRightElement, InputGroup, Input} from '@chakra-ui/react'
import { SearchIcon} from '@chakra-ui/icons'

export default function Search(props) {
    return (
        <>
            <InputGroup size='lg'>
                <Input 
                    onKeyDown={(e) => props.onkeydown(e)} 
                    onChange={(e) => props.onchange(e)} 
                    placeholder='Search' 
                    borderRadius={24} 
                    marginTop={50} 
                    background={"#FFFFFF"} 
                    borderColor={"transparent"}
                    value={props.value}
                />
                <InputRightElement children={<SearchIcon />} marginTop={50} />
            </InputGroup>
        </>
    );
}