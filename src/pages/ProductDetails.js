import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getPassword, getUser } from '../helpers/Utils';
import '../styles/ProductDetails.css'; // Certifique-se de que este arquivo está no caminho correto

export default function ProductDetails() {
    const { id } = useParams(); // Pega o ID do produto da URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Inicia o carregamento

            try {
                console.log(`Fetching product with ID: ${id}`); // Verifica o ID no console
                const response = await axios({
                    method: 'get',
                    url: 'https://productifes-dispmoveisbsi.b4a.run/pegar_produto.php',
                    params: { id },
                    auth: {
                        username: getUser(),
                        password: getPassword()
                    }
                });

                console.log('API response:', response.data); // Verifica a resposta da API no console

                if (response.data["sucesso"] === 1) {
                    setProduct(response.data["produto"]);
                } else {
                    setError('Produto não encontrado ou erro na resposta da API');
                }
            } catch (err) {
                setError('Erro ao buscar o produto: ' + err.message);
            } finally {
                setLoading(false); // Encerra o carregamento
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return (
            <Stack className="product-details" spacing={2} alignItems="center">
                <p>Erro: {error}</p>
                <Button variant="contained" className="button secondary" onClick={() => window.history.back()}>
                    Voltar
                </Button>
            </Stack>
        );
    }

    return (
        <Stack className="product-details" spacing={2} alignItems="center">
            {product ? (
                <Stack spacing={2} alignItems="center">
                    <img
                        src={product.imagem_url}
                        alt={product.nome}
                        className="product-details__image"
                    />
                    <h1 className="product-details__title">{product.nome}</h1>
                    <p className="product-details__price">{product.preco}</p>
                    <p className="product-details__description">{product.descricao}</p>
                    <Stack className="buttons" spacing={2} alignItems="center">
                        <Button variant="contained" className="button primary" onClick={() => window.history.back()}>
                            Voltar
                        </Button>
                    </Stack>
                </Stack>
            ) : (
                <p>Produto não encontrado</p>
            )}
        </Stack>
    );
}
