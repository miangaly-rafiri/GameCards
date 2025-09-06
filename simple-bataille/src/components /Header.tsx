import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Header() {
  const [playerName, setPlayerName] = useState("");

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#C19A6B", px: 3 }}>
      <Toolbar sx={{ minHeight: 80 }}>
        {/* Titre */}
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#302082" }}
        >
          Jeu de Bataille
        </Typography>

        {/* Icône + prénom / input */}
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 0.5 
          }}
        >
          <IconButton 
            size="large" 
            edge="end" 
            color="inherit" 
            sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f0f0f0" } }}
          >
            <AccountCircle fontSize="large" sx={{ color: "#C19A6B" }} />
          </IconButton>

          {/* Input pour prénom */}
          <TextField
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Votre prénom"
            size="small"
            variant="outlined"
            sx={{
              width: 120,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
                "& fieldset": { borderColor: "#C19A6B" },
                "&:hover fieldset": { borderColor: "#302082" },
                "&.Mui-focused fieldset": { borderColor: "#302082" },
              },
              input: { textAlign: "center", color: "#302082", fontWeight: 500 },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
