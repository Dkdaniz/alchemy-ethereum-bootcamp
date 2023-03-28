import { InputRightElement, InputGroup, Input} from '@chakra-ui/react'
import { SearchIcon} from '@chakra-ui/icons'

export default function Search() {
    return (
        <>
            <InputGroup size='lg'>
                <Input placeholder='Search' borderRadius={24} marginTop={50} background={"#FFFFFF"} borderColor={"transparent"}/>
                <InputRightElement children={<SearchIcon />} marginTop={50} />
            </InputGroup>
        </>
    );
}