// #include<bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>
#include <unordered_set>

#define ll = long long;

using namespace std;

int main(void) {

    // Solve for intager number
    // 5x + 2y + z = 90_000;

    int count = 0;
    
    for (int x = 0; x < 18001; ++x) {
        for (int y = 0; y < 45001; ++y) {
            int z = 90000 - 5 * x - 2 * y;
            if (z >= 0) {
                count++;
            }
        }
    }

    cout << count << endl;

    return 0;
}