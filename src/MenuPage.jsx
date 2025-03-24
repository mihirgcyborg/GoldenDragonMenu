import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Collapse,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const getImageUrl = (name) => {
  const formatted = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `/images/${formatted}.jpg`;
};

const fallbackImage = "/images/default-dish.jpg";

const menuData = [
  {
    category: "Soup",
    items: [
      {
        name: "Chicken Dragon Soup",
        price: 160,
        veg: false,
        description:
          "Spicy chicken soup with exotic Asian herbs and fiery flavors.",
      },
      {
        name: "Chicken Sweet Corn Soup",
        price: 160,
        veg: false,
        description:
          "Classic Chinese soup with chicken, sweet corn, and egg drop.",
      },
      {
        name: "Chicken Hot & Sour Soup",
        price: 160,
        veg: false,
        description:
          "Tangy and spicy soup with shredded chicken, tofu, and vegetables.",
      },
      {
        name: "Chicken Man Chow Soup",
        price: 160,
        veg: false,
        description:
          "Spicy Indo-Chinese soup with crunchy noodles and chicken.",
      },
      {
        name: "Chicken Lung Fung Soup",
        price: 160,
        veg: false,
        description:
          "Thick chicken soup with egg drops and a mix of Chinese flavors.",
      },
      {
        name: "Chicken Talomein Soup",
        price: 150,
        veg: false,
        description: "Noodle-based soup with chicken and a mildly spicy broth.",
      },
      {
        name: "Chicken Clear Soup",
        price: 150,
        veg: false,
        description:
          "Light chicken broth with finely chopped veggies and herbs.",
      },
      {
        name: "Chicken Noodles Soup",
        price: 150,
        veg: false,
        description:
          "Comforting soup with noodles and chicken in a seasoned broth.",
      },
      {
        name: "Veg. Dragon Soup",
        price: 140,
        veg: true,
        description: "Spicy mixed vegetable soup with dragon-style seasoning.",
      },
      {
        name: "Veg. Sweet Corn Soup",
        price: 150,
        veg: true,
        description:
          "Smooth soup with sweet corn, vegetables, and a mild flavor.",
      },
      {
        name: "Veg. Hot & Sour Soup",
        price: 130,
        veg: true,
        description:
          "Hot and tangy soup made with vegetables and Asian spices.",
      },
      {
        name: "Veg. Man Chow Soup",
        price: 130,
        veg: true,
        description: "Thick, spicy soup served with crispy noodles on top.",
      },
      {
        name: "Veg. Lung Fung Soup",
        price: 130,
        veg: true,
        description: "Vegetable version of lung fung soup with rich flavor.",
      },
      {
        name: "Veg. Talomein Soup",
        price: 130,
        veg: true,
        description: "Mild noodle soup with assorted vegetables.",
      },
      {
        name: "Veg. Clear Soup",
        price: 130,
        veg: true,
        description: "Simple, clear vegetable broth for a light start.",
      },
      {
        name: "Veg. Noodles Soup",
        price: 130,
        veg: true,
        description: "Noodle-based soup with vegetables and subtle spices.",
      },
      {
        name: "Tomato Soup",
        price: 130,
        veg: true,
        description: "Classic creamy tomato soup with a hint of herbs.",
      },
    ],
  },
  {
    category: "Gravy/Dry",
    items: [
      {
        name: "Chicken Manchurian",
        price: 240,
        veg: false,
        description:
          "Juicy chicken balls tossed in Indo-Chinese Manchurian sauce.",
      },
      {
        name: "Chicken Chilly",
        price: 250,
        veg: false,
        description: "Fried chicken pieces tossed in spicy green chili sauce.",
      },
      {
        name: "Chicken Hong Kong",
        price: 250,
        veg: false,
        description: "Sweet and tangy chicken cooked Hong Kong-style.",
      },
      {
        name: "Chicken Schezwan",
        price: 250,
        veg: false,
        description: "Spicy chicken in rich schezwan sauce.",
      },
      {
        name: "Chicken Garlic",
        price: 250,
        veg: false,
        description: "Chicken cooked with loads of garlic and spices.",
      },
      {
        name: "Chicken Ginger",
        price: 250,
        veg: false,
        description: "Zesty chicken dish with ginger-infused sauce.",
      },
      {
        name: "Chicken Chow Chow",
        price: 260,
        veg: false,
        description: "Chicken dry dish with Indo-Chinese flavor medley.",
      },
      {
        name: "Crispy Chicken",
        price: 270,
        veg: false,
        description: "Deep-fried crispy chicken pieces served dry.",
      },
      {
        name: "Shanghai Chicken",
        price: 270,
        veg: false,
        description: "Chicken cooked in sweet, spicy Shanghai sauce.",
      },
      {
        name: "Sweet & Sour Chicken",
        price: 260,
        veg: false,
        description: "Chicken in sweet and tangy sauce with bell peppers.",
      },
      {
        name: "Chicken 65",
        price: 260,
        veg: false,
        description: "Popular spicy South Indian-style fried chicken.",
      },
      {
        name: "Chicken Lollipop (Deep Fry)",
        price: 250,
        veg: false,
        description: "Crispy fried chicken drumettes served with sauce.",
      },
      {
        name: "Chicken Lollipop (Wet Dry Masala)",
        price: 260,
        veg: false,
        description: "Chicken lollipops cooked in dry spicy gravy.",
      },
      {
        name: "Chicken Lollipop In Gravy",
        price: 260,
        veg: false,
        description: "Chicken lollipops simmered in rich Chinese gravy.",
      },
      {
        name: "Veg. Manchurian",
        price: 160,
        veg: true,
        description: "Veg balls tossed in savory Manchurian sauce.",
      },
      {
        name: "Veg. Chilli",
        price: 160,
        veg: true,
        description: "Spicy dry preparation of veggies with green chilies.",
      },
      {
        name: "Veg. Hong Kong",
        price: 160,
        veg: true,
        description: "Veggies cooked in tangy Hong Kong-style gravy.",
      },
      {
        name: "Veg. Schezwan",
        price: 160,
        veg: true,
        description: "Spicy and tangy veggies in schezwan sauce.",
      },
      {
        name: "Veg. Garlic",
        price: 160,
        veg: true,
        description: "Garlicky Indo-Chinese vegetable preparation.",
      },
      {
        name: "Veg. Ginger",
        price: 160,
        veg: true,
        description: "Veggies tossed in ginger-flavored spicy sauce.",
      },
      {
        name: "Veg. Crispy",
        price: 170,
        veg: true,
        description: "Crispy fried vegetables with spicy coating.",
      },
      {
        name: "Veg. 65",
        price: 170,
        veg: true,
        description: "Spicy deep-fried veggies inspired by Chicken 65.",
      },
      {
        name: "Veg. Shanghai",
        price: 170,
        veg: true,
        description: "Shanghai-style vegetables in spicy gravy.",
      },
      {
        name: "Veg. Sweet & Sour",
        price: 170,
        veg: true,
        description: "Tangy and sweet gravy with sautéed vegetables.",
      },
      {
        name: "Cauliflower Lollypop",
        price: 160,
        veg: true,
        description: "Crispy cauliflower fritters shaped like lollipops.",
      },
      {
        name: "Paneer Manchurian",
        price: 170,
        veg: true,
        description: "Paneer cubes tossed in Manchurian gravy.",
      },
      {
        name: "Paneer 65",
        price: 180,
        veg: true,
        description: "Spicy fried paneer cubes inspired by Chicken 65.",
      },
      {
        name: "Paneer China Town",
        price: 180,
        veg: true,
        description: "Paneer with rich Chinatown-style sauces.",
      },
      {
        name: "Mushroom Chilly",
        price: 180,
        veg: true,
        description: "Mushrooms tossed with onions and green chilies.",
      },
      {
        name: "Gobi Manchurian",
        price: 160,
        veg: true,
        description: "Cauliflower balls tossed in spicy Manchurian sauce.",
      },
      {
        name: "Soya Chilly",
        price: 170,
        veg: true,
        description: "Soy chunks cooked in chili garlic sauce.",
      },
      {
        name: "Potato Chilly",
        price: 170,
        veg: true,
        description: "Crispy potatoes tossed in chili garlic sauce.",
      },
      {
        name: "Honey Potato Chilly",
        price: 180,
        veg: true,
        description: "Potatoes in sweet honey chili glaze.",
      },
    ],
  },
  {
    category: "Rice",
    items: [
      {
        name: "Chicken Dragon Rice",
        price: 300,
        veg: false,
        description:
          "Flavorful fried rice with chicken, spices, and signature dragon sauce.",
      },
      {
        name: "Chicken Fried Rice",
        price: 250,
        veg: false,
        description:
          "Classic Chinese fried rice with egg and shredded chicken.",
      },
      {
        name: "Chicken Schezwan Rice",
        price: 250,
        veg: false,
        description:
          "Spicy rice stir-fried with chicken and fiery schezwan sauce.",
      },
      {
        name: "Chicken Hong Kong Rice",
        price: 270,
        veg: false,
        description:
          "Fusion rice dish with tangy Hong Kong style flavors and chicken.",
      },
      {
        name: "Chicken Singapuri Fried Rice",
        price: 280,
        veg: false,
        description: "Spicy Singapore-style rice with chicken and veggies.",
      },
      {
        name: "Chicken Triple Schezwan Rice",
        price: 300,
        veg: false,
        description: "Combo of rice, noodles, and gravy with schezwan spices.",
      },
      {
        name: "Chicken Shanghai Rice",
        price: 280,
        veg: false,
        description:
          "Rice tossed with chicken in sweet & spicy Shanghai sauce.",
      },
      {
        name: "Chicken Manchurian Rice",
        price: 260,
        veg: false,
        description: "Fried rice served with Manchurian chicken balls.",
      },
      {
        name: "Chicken Rice Noodle",
        price: 260,
        veg: false,
        description:
          "Soft rice noodles stir-fried with shredded chicken and sauces.",
      },
      {
        name: "Chicken Stewed Rice",
        price: 250,
        veg: false,
        description: "Tender chicken stewed and served over seasoned rice.",
      },
      {
        name: "Egg Fried Rice",
        price: 230,
        veg: false,
        description: "Fried rice mixed with scrambled eggs and soy sauce.",
      },
      {
        name: "Egg Schezwan Rice",
        price: 250,
        veg: false,
        description: "Egg fried rice with spicy schezwan sauce.",
      },
      {
        name: "Egg Shanghai Rice",
        price: 250,
        veg: false,
        description: "Egg fried rice with flavorful Shanghai-style sauce.",
      },
      {
        name: "Egg Triple Schezwan Rice",
        price: 300,
        veg: false,
        description:
          "Triple combination of egg fried rice, noodles, and gravy.",
      },
      {
        name: "Veg. Dragon Rice",
        price: 260,
        veg: true,
        description: "Fried rice with mixed vegetables and bold dragon spices.",
      },
      {
        name: "Veg. Fried Rice",
        price: 200,
        veg: true,
        description:
          "Classic vegetable fried rice tossed with soy and aromatics.",
      },
      {
        name: "Veg. Schezwan Rice",
        price: 200,
        veg: true,
        description: "Spicy vegetable rice with schezwan flavor.",
      },
      {
        name: "Veg. Hong Kong Rice",
        price: 220,
        veg: true,
        description: "Fried rice with vegetables in a tangy Hong Kong sauce.",
      },
      {
        name: "Veg. Singapuri Fried Rice",
        price: 220,
        veg: true,
        description: "Hot and spicy veggie rice with Singapuri flavor.",
      },
      {
        name: "Veg. Triple Schezwan Rice",
        price: 250,
        veg: true,
        description: "Schezwan fried rice, noodles, and gravy in one plate.",
      },
      {
        name: "Veg. Manchurian Rice",
        price: 250,
        veg: true,
        description: "Fried rice served with Manchurian veg balls.",
      },
      {
        name: "Veg. Shanghai Rice",
        price: 250,
        veg: true,
        description: "Fried rice tossed with Shanghai-style sauces.",
      },
      {
        name: "Veg. Rice Noodle",
        price: 200,
        veg: true,
        description: "Soft rice noodles stir-fried with vegetables.",
      },
      {
        name: "Veg. Schezwan Rice Noodle",
        price: 200,
        veg: true,
        description: "Rice noodles in spicy schezwan-style sauce.",
      },
      {
        name: "Veg. Stewed Rice",
        price: 200,
        veg: true,
        description: "Stewed vegetables served on a bed of seasoned rice.",
      },
      {
        name: "Mushroom Fried Rice",
        price: 250,
        veg: true,
        description: "Aromatic fried rice with sliced mushrooms.",
      },
    ],
  },
  {
    category: "Noodles",
    items: [
      {
        name: "Chicken Dragon Noodles",
        price: 300,
        veg: false,
        description:
          "Spicy stir-fried noodles with chicken in dragon-style sauce.",
      },
      {
        name: "Chicken Hakka Noodles",
        price: 250,
        veg: false,
        description:
          "Popular Indo-Chinese noodles with chicken and vegetables.",
      },
      {
        name: "Chicken Schezwan Noodles",
        price: 270,
        veg: false,
        description: "Noodles tossed in fiery schezwan sauce and chicken.",
      },
      {
        name: "Chicken Singapuri Noodles",
        price: 270,
        veg: false,
        description: "Hot and spicy Singapore-style chicken noodles.",
      },
      {
        name: "Chicken Hong Kong Noodles",
        price: 300,
        veg: false,
        description: "Fusion-style noodles in a tangy Hong Kong sauce.",
      },
      {
        name: "Chicken Triple Noodles",
        price: 320,
        veg: false,
        description: "Combination of noodles, rice, and gravy in one bowl.",
      },
      {
        name: "Chicken Manchurian Noodles",
        price: 300,
        veg: false,
        description: "Noodles with Manchurian-style chicken chunks.",
      },
      {
        name: "Chicken Chowmein",
        price: 300,
        veg: false,
        description: "Classic chicken chowmein with crunchy vegetables.",
      },
      {
        name: "Chicken Shanghai Noodles",
        price: 280,
        veg: false,
        description: "Noodles cooked in sweet and spicy Shanghai sauce.",
      },
      {
        name: "Chicken Pan Fried Noodles",
        price: 260,
        veg: false,
        description: "Crispy pan-fried noodles with chicken gravy.",
      },
      {
        name: "Egg Hakka Noodles",
        price: 230,
        veg: false,
        description: "Stir-fried noodles with egg and vegetables.",
      },
      {
        name: "Egg Schezwan Noodles",
        price: 230,
        veg: false,
        description: "Spicy noodles with scrambled eggs in schezwan sauce.",
      },
      {
        name: "Egg Triple Schezwan Noodles",
        price: 300,
        veg: false,
        description: "Egg noodles with schezwan rice and gravy combo.",
      },
      {
        name: "Veg. Dragon Noodles",
        price: 230,
        veg: true,
        description: "Spicy vegetarian noodles with bold dragon flavor.",
      },
      {
        name: "Veg. Hakka Noodles",
        price: 200,
        veg: true,
        description: "Classic Indo-Chinese noodles tossed with veggies.",
      },
      {
        name: "Veg. Schezwan Noodles",
        price: 200,
        veg: true,
        description: "Spicy noodles with vegetables and schezwan sauce.",
      },
      {
        name: "Veg. Singapuri Noodles",
        price: 220,
        veg: true,
        description: "Hot and spicy noodles with a Singapuri twist.",
      },
      {
        name: "Veg. Hong Kong Noodles",
        price: 220,
        veg: true,
        description: "Tangy Hong Kong-style vegetable noodles.",
      },
      {
        name: "Veg. Manchurian Noodles",
        price: 230,
        veg: true,
        description: "Noodles served with Manchurian veg balls.",
      },
      {
        name: "Veg. Chowmein",
        price: 200,
        veg: true,
        description: "Stir-fried noodles with assorted vegetables.",
      },
      {
        name: "Veg. Shanghai Noodles",
        price: 230,
        veg: true,
        description: "Noodles tossed in spicy Shanghai sauce.",
      },
      {
        name: "Veg. Pan Fried Noodles",
        price: 220,
        veg: true,
        description: "Crispy fried noodles with vegetable gravy.",
      },
      {
        name: "Veg. Triple Noodles",
        price: 250,
        veg: true,
        description: "Triple combination of noodles, rice, and gravy.",
      },
    ],
  },
  {
    category: "Choupsey",
    items: [
      {
        name: "Chicken American Choupsey",
        price: 270,
        veg: false,
        description:
          "Crispy noodles topped with chicken and tangy American gravy.",
      },
      {
        name: "Chicken Chinese Choupsey",
        price: 250,
        veg: false,
        description: "Stir-fried noodles with chicken in Chinese-style sauce.",
      },
      {
        name: "Chicken Schezwan Choupsey",
        price: 250,
        veg: false,
        description: "Spicy Schezwan chicken over crispy noodles.",
      },
      {
        name: "Chicken Chinese Bhel",
        price: 170,
        veg: false,
        description: "Crunchy bhel-style snack with chicken and tangy sauces.",
      },

      {
        name: "Veg. American Choupsey",
        price: 230,
        veg: true,
        description:
          "Crispy noodles topped with sweet and tangy vegetable gravy.",
      },
      {
        name: "Veg. Chinese Choupsey",
        price: 220,
        veg: true,
        description: "Vegetables sautéed in Chinese sauces over fried noodles.",
      },
      {
        name: "Veg. Schezwan Choupsey",
        price: 220,
        veg: true,
        description: "Spicy vegetarian choupsey with bold Schezwan flavors.",
      },
    ],
  },
  {
    category: "Rolls",
    items: [
      {
        name: "Chicken Schezwan Spring Roll",
        price: 240,
        veg: false,
        description:
          "Crispy spring rolls filled with spicy chicken and schezwan sauce.",
      },
      {
        name: "Chicken Spring Roll",
        price: 240,
        veg: false,
        description:
          "Golden fried rolls filled with seasoned chicken and vegetables.",
      },
      {
        name: "Egg Spring Roll",
        price: 230,
        veg: false,
        description:
          "Spring roll stuffed with egg and spices, deep fried till crisp.",
      },
      {
        name: "Mixed Spring Roll",
        price: 280,
        veg: false,
        description:
          "A fusion of chicken, egg, and vegetables wrapped in a crispy roll.",
      },
      {
        name: "Veg. Spring Roll",
        price: 190,
        veg: true,
        description:
          "Crispy fried roll filled with a mix of vegetables and spices.",
      },
      {
        name: "Veg. Schezwan Spring Roll",
        price: 200,
        veg: true,
        description: "Spicy vegetable rolls with schezwan sauce stuffing.",
      },
      {
        name: "Veg. Chinese Bhel",
        price: 140,
        veg: true,
        description:
          "Crispy noodles tossed with veggies and tangy Chinese sauces.",
      },
    ],
  },
  {
    category: "Extra",
    items: [
      {
        name: "Mineral Water",
        price: 20,
        veg: true,
        description: "Bottled drinking water.",
      },
      {
        name: "Cold Drink",
        price: 25,
        veg: true,
        description: "Chilled soft drink.",
      },
      {
        name: "Plain Omlette",
        price: 30,
        veg: false,
        description: "Fluffy two-egg omelette served plain or with seasonings.",
      },
    ],
  },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 600,
        mx: "auto",
        bgcolor: "#141414",
        minHeight: "100vh",
        color: "#f5f5dc",
      }}
    >
      <Box mb={2} textAlign="center">
        <img
          src="/logo.png"
          alt="New Golden Dragon"
          style={{ height: 100, marginBottom: 10 }}
        />
        <Typography variant="h5" fontWeight="bold" color="#ffd700">
          NEW GOLDEN DRAGON
        </Typography>
        <Typography variant="body2">Chinese Fast Food</Typography>
      </Box>

      <Box display="flex" gap={1} mb={2} flexWrap="wrap" alignItems="center">
        <Typography variant="body2">Veg Only</Typography>
        <Switch
          checked={vegOnly}
          onChange={() => setVegOnly(!vegOnly)}
          color="success"
        />
      </Box>

      {menuData.map(({ category, items }) => (
        <Box key={category} mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleCategory(category)}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            <Typography variant="h6" color="#ffd700">
              {category}
            </Typography>
            {expandedCategories[category] ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </Box>

          <Collapse
            in={expandedCategories[category]}
            timeout="auto"
            unmountOnExit
          >
            {items
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) &&
                  (!vegOnly || item.veg)
              )
              .map((item, index) => {
                const imageUrl = getImageUrl(item.name);
                return (
                  <Card key={index} sx={{ mb: 2, backgroundColor: "#f9f5ec" }}>
                    <CardContent sx={{ display: "flex", gap: 2 }}>
                      <img
                        src={imageUrl}
                        alt={item.name}
                        onError={(e) => (e.target.src = fallbackImage)}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <Typography fontWeight="bold" color="#111">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="green">
                          {item.veg ? "🟢 Veg" : "🔴 Non-Veg"}
                        </Typography>
                        <Typography variant="body2" mt={0.5} color="#333">
                          {item.description}
                        </Typography>
                        <Typography fontWeight="bold" color="#000" mt={1}>
                          ₹{item.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
          </Collapse>
        </Box>
      ))}

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "#141414",
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderTop: "1px solid #333",
        }}
      >
        <SearchIcon style={{ color: "#ffd700" }} />
        <TextField
          fullWidth
          placeholder="Search menu"
          variant="standard"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ disableUnderline: true, sx: { color: "white" } }}
        />
        <Chip
          label="🍽️ Menu"
          variant="outlined"
          sx={{ color: "#ffd700", borderColor: "#ffd700" }}
        />
      </Box>
    </Box>
  );
}
