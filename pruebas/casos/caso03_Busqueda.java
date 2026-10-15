public class Busqueda {
    public static int buscar(String[] nombres, String objetivo) {
        for (int i = 0; i <= nombres.length; i++) {
            if (nombres[i] == objetivo) {
                return i;
            }
        }
        return -1;
    }
}
