import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getPassword, getUser } from '../helpers/Utils';
import '../styles/UpdateProduct.css';

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem_url: ''
  });
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://productifes-dispmoveisbsi.b4a.run/pegar_produto.php`,
      params: { id },
      auth: {
        username: getUser(),
        password: getPassword()
      }
    }).then((response) => {
      if (response.data["sucesso"] === 1) {
        setProduct(response.data["produto"]);
        setOriginalProduct(response.data["produto"]);
      } else {
        window.alert("Erro ao obter detalhes do produto: \n" + response.data["erro"]);
      }
    }).catch(error => {
      window.alert("Erro ao obter detalhes do produto: \n" + error.message);
    });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(product) !== JSON.stringify(originalProduct)) {
      if (window.confirm('Você deseja salvar as alterações?')) {
        axios({
          method: 'post',
          url: 'https://productifes-dispmoveisbsi.b4a.run/atualizar_produto.php',
          data: {
            id,
            ...product
          },
          auth: {
            username: getUser(),
            password: getPassword()
          }
        }).then((response) => {
          if (response.data["sucesso"] === 1) {
            window.alert("Produto atualizado com sucesso");
            navigate(`/productDetails/${id}`);
          } else {
            window.alert("Erro ao atualizar produto: \n" + response.data["erro"]);
          }
        }).catch(error => {
          window.alert("Erro ao atualizar produto: \n" + error.message);
        });
      }
    } else {
      window.alert("Nenhuma alteração detectada.");
    }
  };

  return (
    <div className="update-product">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="nome"
            value={product.nome}
            onChange={handleChange}
            required
          />
          <TextField
            label="Preço"
            name="preco"
            value={product.preco}
            onChange={handleChange}
            required
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={product.descricao}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <img
            src={product.imagem_url}
            alt={product.nome}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <Button variant="contained" type="submit">
            Atualizar Produto
          </Button>
        </Stack>
      </form>
    </div>
  );
}
