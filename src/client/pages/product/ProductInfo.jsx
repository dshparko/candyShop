import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../Announcement";
import Candy from "../../Components/image/candy.jpg"
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest} from "../../../requestMethods";
import {addProduct} from "../../redux/cartRedux"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 50px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 25px;
  padding: 15px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #e1122c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: #e1122c;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: rgba(225, 18, 44, 0.83);
  }
`;

const ProductInfo = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const isAuth = useSelector(state => state.user.isAuth)
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch(e) {
            }
        };
        getProduct();

    }, [id]);

    useEffect(() =>{
        const setColorSize = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setColor(res.data.color);
                setSize(res.data.size);
            } catch(e) {
            }
        };
        setColorSize();

    },)

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
            console.log(product, quantity, color, size);
        dispatch(
            addProduct({...product, quantity, color, size })
        );
    };
    return (
        <Container>
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                                <FilterColor color={product.color} />
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <h1>{product.size}</h1>
                        </Filter>
                    </FilterContainer>
                    { isAuth && <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>}
                </InfoContainer>
            </Wrapper>
        </Container>
    );
};

export default ProductInfo;