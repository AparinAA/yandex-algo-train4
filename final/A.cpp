// #include<bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>

#define ll = long long;

using namespace std;

int main(){
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);

    int x;
    cin >> x;

    int l = 1;
	int r = 1;
	int index = 1;
	int last = 0;

    while (l <= x && r <= x && index <= x) {
		if (l * l < r * r * r) {
			last = 1;
			l++;
		} else if (l * l > r * r * r) {
			last = 0;
			r++;
		} else {
			last = 1;
			l++;
			r++;
		}
		index++;
	}

	if (last == 1) {
		cout << (l - 1) * (l - 1);
	} else {
		cout << (r - 1) * (r - 1);
	}

    return 0;
}
