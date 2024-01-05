import { Box, Avatar, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { getUserInitials, isAdmin } from "../../helpers";
import { useUser } from "../../hooks";
import { Link } from "../atoms";
import { useState } from "react";
import { logout } from "../../redux";
import { useDispatch } from "react-redux";
import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10
}));

export const UserIcon = () => {

    const { userData } = useUser();
    const [anchor, setAnchor] = useState(null);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box>
            <IconButton onClick={(e) => setAnchor(e.target)}>
                <Avatar>
                    {getUserInitials(userData)}
                </Avatar>
            </IconButton>
            <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={() => setAnchor(null)} >
                <StyledBox>
                    {!userData && (
                        <>
                            <MenuItem>
                                <Link to='/login'>{t("sign_in")}</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/signup'>{t("sign_up")}</Link>
                            </MenuItem>
                        </>
                    )}
                    {userData && <MenuItem>
                        <Button onClick={() => {
                            dispatch(logout())
                            navigate('/')
                        }}>
                            {t("log_out")}
                        </Button>
                    </MenuItem>}
                    {isAdmin(userData) && <MenuItem><Link to='/products/add'>{t("add_product")}</Link></MenuItem>}
                </StyledBox>
            </Menu>
        </Box>
    );
};
