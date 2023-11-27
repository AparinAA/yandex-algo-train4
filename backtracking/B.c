#include <stdio.h>
#include <stdlib.h>

int backtrackQueen(int row, int count, int cols, int hills, int dales, int);

int backtrackQueen(int row, int count, int cols, int hills, int dales, int n)
{
    if (row == n)
    {
        return ++count;
    }

    int col = 0;
    for (col = 0; col < n; col++)
    {
        if (
            !(
                cols & (1 << col) ||
                hills & (1 << (32 - (row - col))) ||
                dales & (1 << (row + col))))
        {
            cols |= 1 << col;
            hills |= 1 << (32 - (row - col));
            dales |= 1 << (row + col);

            count = backtrackQueen(row + 1, count, cols, hills, dales, n);

            cols ^= 1 << col;
            hills ^= 1 << (32 - (row - col));
            dales ^= 1 << (row + col);
        }
    }
    return count;
}

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0;
    fscanf(in, "%d", &n);

    fprintf(out, "%d", backtrackQueen(0, 0, 0, 0, 0, n));

    fclose(in);
    fclose(out);

    return 0;
}