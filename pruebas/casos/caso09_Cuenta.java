import java.util.Scanner;

public class Cuenta {
    private double saldo;

    public void retirar(double monto) {
        saldo = saldo - monto;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Cuenta c = new Cuenta();
        double monto = sc.nextDouble();
        try {
            c.retirar(monto);
        } catch (Exception e) {
        }
        System.out.println("Saldo: " + c.saldo);
    }
}
